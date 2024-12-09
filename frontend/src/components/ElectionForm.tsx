import React from "react";

import Typography from "@mui/material/Typography";

import MovieList from "@/components/MovieList";

import { useAppContext } from "@/context/useAppContext";

import { Movie } from "@/types";

const ElectionForm = () => {
  const [selectedMovies, setSelectedMovies] = React.useState<Movie[]>([]);

  const {
    movies,
    movieError: error,
    movieLoading: loading,
    searchQuery,
  } = useAppContext();

  const renderCount = React.useRef(0);

  const filteredMovies: Movie[] = movies?.filter((movie) => {
    console.log("searchQuery:", searchQuery);
    return movie.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  console.log("filteredMovies.length:", filteredMovies.length);

  const handleCheckboxChange = React.useCallback((movie: Movie) => {
    setSelectedMovies((prev) =>
      prev.includes(movie)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie]
    );
  }, []);

  React.useEffect(() => {
    renderCount.current += 1;
    console.log(`Component has rendered ${renderCount.current} times`);
  });

  if (loading) return <Typography align="center">Loading...</Typography>;
  if (error) {
    console.error(error);
    return (
      <Typography align="center">
        Error fetching movies: {error.message}
      </Typography>
    );
  }

  const isChecked = (movie: Movie) => selectedMovies.includes(movie);

  return (
    <MovieList
      movies={filteredMovies}
      onChange={handleCheckboxChange}
      checked={isChecked}
    />
  );
};

export default ElectionForm;
