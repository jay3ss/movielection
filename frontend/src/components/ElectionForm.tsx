import React, { useState } from "react";

import MovieCard from "@/components/MovieCard";
import { useGetMovies } from "@/hooks/useGetMovies";
import { Movie } from "@/types";

const ElectionForm = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);

  const { movies, error, loading } = useGetMovies();

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error(error);
    return <div>Error fetching movies: {error.message}</div>;
  }
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCheckboxChange = (movie: Movie) => {
    setSelectedMovies((prev) =>
      prev.includes(movie)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie]
    );
  };

  const filteredMovies: Movie[] = movies?.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* sticky search input*/}
      <input
        type="text"
        placeholder="Search for movies"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ position: "sticky", top: 0, zIndex: 100, width: "100%" }}
      />

      {/* movie list */}
      <div style={{ maxHeight: "600px", overflowY: "scroll" }}>
        {filteredMovies?.map((movie) => (
          <div key={movie.id} style={{ display: "flex", alignItems: "center" }}>
            <MovieCard
              key={movie.id}
              movie={movie}
              checked={selectedMovies.includes(movie)}
              onChange={handleCheckboxChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectionForm;
