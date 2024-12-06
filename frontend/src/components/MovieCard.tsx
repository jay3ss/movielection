import React from "react";
import { Movie } from "@/types";

interface MovieCardProps {
  movie: Movie;
  checked: boolean;
  onChange: (movie: Movie) => void;
}

const fromatDateString = (d: string) =>
  new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const MovieCard: React.FC<MovieCardProps> = ({ movie, checked, onChange }) => {
  return (
    <div style={styles.card}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(movie)}
      />
      {movie.imdb && (
        <img src={movie.image} alt={movie.title} style={styles.thumbnail} />
      )}
      <div style={styles.content}>
        <div>
          <h3 style={styles.title}>{movie.title}</h3>
          <div>
            <p>
              <strong>Rating:</strong> {movie.rating || "N/A"}
            </p>
            <p>
              <strong>Released:</strong> {fromatDateString(movie.premiere_date)}
            </p>
            <p>
              <strong>Runtime:</strong> {Math.round(movie.duration)} min
            </p>
            {movie.imdb && (
              <a
                href={`https://imdb.com/title/${movie.imdb}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                IMDb Page
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    width: "100%",
  },
  content: {
    flex: "1",
  },
  title: {
    margin: "0",
    fontSize: "18px",
  },
  thumbnail: {
    width: "6rem",
    height: "auto",
    borderRadius: "4px",
    marginLeft: "10px",
    marginRight: "10px",
  },
};

export default MovieCard;
