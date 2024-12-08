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
    <div className="card">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(movie)}
      />
      {movie.imdb && (
        <img src={movie.image} alt={movie.title} className="card-thumbnail" />
      )}
      <div className="card-content">
        <div>
          <h3 className="card-title">{movie.title}</h3>
          <div className="card-movie-metadata">
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

export default MovieCard;
