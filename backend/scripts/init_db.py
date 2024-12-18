import json
import logging
import os
import re
import time
from uuid import uuid4

import ollama
import requests
from alembic import command
from alembic.config import Config
from dotenv import load_dotenv
from sqlalchemy.exc import SQLAlchemyError
from sqlmodel import Session

from app.core.db import engine
from app.models import Movie

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

# Create a stream handler to output to the console
console_handler = logging.StreamHandler()
console_handler.setLevel(
    logging.DEBUG
)  # You can set this to INFO, WARNING, etc. as needed

# Define the logging format
formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
console_handler.setFormatter(formatter)

# Add the handler to the logger
logger.addHandler(console_handler)


load_dotenv(".env")

ALLOWED_FORMATS = {
    "mp4",
    "mkv",
}  # Add more formats as needed
BATCH_SIZE = int(os.environ.get("BATCH_SIZE", 25))
JELLYFIN_API_KEY = os.environ.get("JELLYFIN_API_KEY")
JELLYFIN_SERVER_URL = os.environ.get("JELLYFIN_SERVER_URL")
MINIMUM_MOVIE_DURATION = int(os.environ.get("MINIMUM_MOVIE_DURATION", 25))
TMDB_API_KEY = os.environ.get("TMDB_API_KEY")


def run_migrations():
    """Run Alembic migrations to ensure the database schema is up-to-date."""
    alembic_cfg = Config("alembic.ini")

    try:
        logger.info("Running migrations...")
        command.upgrade(alembic_cfg, "head")
        logger.info("Migrations completed successfully")
    except Exception as e:
        logger.error("Error during migrations:", e)
        raise


def fetch_movies_from_jellyfin():
    """Fetch movies from the Jellyfin server"""
    url = f"{JELLYFIN_SERVER_URL}/Items"
    params = {
        "Recursive": True,
        "SortBy": "SortName",
        "SortOrder": "Ascending",
        "api_key": JELLYFIN_API_KEY,
    }
    logger.info("Fetching movies from Jellyfin...")
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        movies_data = response.json().get("Items", [])
        logger.info(f"Successfully fetched {len(movies_data)} from Jellyfin")

        # filter the movies for low-quality files
        excluded_formats = {"avi"}
        return filter_movies_by_format(movies_data)
    except requests.exceptions.RequestException as e:
        logger.error(
            f"Error fetching data from Jellyfin server @ {JELLYFIN_SERVER_URL}: {e}"
        )
        return []
    except KeyError as e:
        logger.error(f"Error with key: {e}")


def seed_database():
    """Seed the database with initial data from Jellyfin"""
    try:
        movies_data = fetch_movies_from_jellyfin()
        not_a_movie = "not a movie"
        if movies_data:
            with Session(engine) as session:
                for num, movie_data in enumerate(movies_data, 1):
                    try:
                        cleaned_title, classification = clean_and_classify_title(
                            movie_data.get("Name", not_a_movie)
                        )
                        duration = ticks_to_time(
                            movie_data.get("RunTimeTicks", 0)
                        )  # mins
                    except Exception as e:
                        logger.error(f"Error cleaning title or classifying: {e}")
                        continue

                    if (
                        classification.lower() == "movie"
                        and cleaned_title != not_a_movie
                        and duration > MINIMUM_MOVIE_DURATION
                    ):
                        tmdb_id = get_tmdb_id(cleaned_title)
                        imdb_id = get_imdb_id(tmdb_id) if tmdb_id is not None else None
                        movie = Movie(
                            title=cleaned_title,
                            duration=duration,
                            imdb=imdb_id,
                            id=str(uuid4()),
                        )
                        session.add(movie)
                        logger.debug(f"Successfully added {cleaned_title}")
                        if num % BATCH_SIZE == 0:
                            session.commit()
                            logger.debug(f"Committed {num} records")
                session.commit()

        else:
            logger.info("No movies to seed")
    except SQLAlchemyError as e:
        logger.error(f"Error while seeding database: {e}")


# --------------- HELPERS ---------------#


def filter_movies_by_format(movies: list[Movie]) -> list[Movie]:
    """Filters out movies with low-quality file types"""
    filtered_movies = []
    for movie in movies:
        if "Container" in movie:
            formats = movie["Container"].split(",")  # Split the comma-delimited string
            if any(format.strip() in ALLOWED_FORMATS for format in formats):
                filtered_movies.append(movie)
    return filtered_movies


def clean_and_classify_title(title: str) -> tuple[str, str]:
    prompt = f"Clean the following title by removing unnecessary information \
    (such as resolution, formats, years, etc.), then classify it as either a 'movie', \
    'TV show', or 'educational'. Output only a valid JSON structure containing two fields: \
    'cleaned_title' and 'classification'. No additional explanation or text should be \
    included: {title}"

    # Use the Ollama API to get the response
    response = ollama.chat(
        model="llama3.2:latest", messages=[{"role": "user", "content": prompt}]
    )
    result = json.loads(response["message"]["content"])
    return result["cleaned_title"], result["classification"]


def ticks_to_time(ticks: int) -> float:
    """Converts the `RunTimeTicks` parameter to minutes."""
    return ticks / 10000000 / 60


def get_tmdb_id(movie_title: str) -> str:
    search_url = f"https://api.themoviedb.org/3/search/movie?query={movie_title}"
    params = {"api_key": TMDB_API_KEY}
    response = requests.get(search_url, params=params)

    if response.status_code == 429:
        time.sleep(1)
        response = requests.get(search_url, params=params)
    else:
        data = response.json()

    if data["results"]:
        tmdb_id = data["results"][0]["id"]
        return tmdb_id
    return None


def get_imdb_id(tmdb_id: str) -> str:
    url = f"https://api.themoviedb.org/3/movie/{tmdb_id}/external_ids"
    params = {"api_key": TMDB_API_KEY}
    response = requests.get(url, params=params)

    if response.status_code == 429:
        time.sleep(1)
        response = requests.get(url, params=params)

    elif response.status_code == 200:
        return response.json().get("imdb_id", None)

    logger.warning(f"Failed to get data for IMDb id {tmdb_id}")
    return None


def main():
    """Main function to run migrations and seed the database"""
    logger.info("Initializing the database setup...")
    # run_migrations()
    seed_database()
    logger.info("Database setup and seeding complete")


if __name__ == "__main__":
    main()
