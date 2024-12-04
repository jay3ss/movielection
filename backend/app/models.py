from datetime import datetime

from sqlmodel import Field, Relationship, SQLModel


class ElectionMovieLink(SQLModel, table=True):
    election_id: str | None = Field(
        default=None, foreign_key="election.id", primary_key=True
    )
    movie_id: str | None = Field(default=None, foreign_key="movie.id", primary_key=True)


class Movie(SQLModel, table=True):
    id: str | None = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    duration: int  # minutes
    imdb: str | None
    premiere_date: datetime | None
    rating: str | None


class Election(SQLModel, table=True):
    id: str | None = Field(default=None, primary_key=True)
    created_at: datetime
    finishes_at: datetime = Field(index=True)
    movies: list[Movie] = Relationship(link_model=ElectionMovieLink)
    winner_id: str | None = None


class Vote(SQLModel, table=True):
    id: str | None = Field(default=None, primary_key=True)
    election_id: str = Field(foreign_key="election.id")
    movie_id: str = Field(foreign_key="movie.id")
