import React from "react";

import Typography from "@mui/material/Typography";

import MovieList from "@/components/MovieList";

import { useAppContext } from "@/context/useAppContext";

import { Movie } from "@/types";

const ElectionForm = React.memo(() => {
  const [selectedMovies, setSelectedMovies] = React.useState<string[]>([]);
  console.log(selectedMovies);

  const {
    movies,
    movieError: error,
    movieLoading: loading,
    searchQuery,
  } = useAppContext();

  const renderCount = React.useRef(0);

  const filteredMovies: Movie[] = React.useMemo(
    () =>
      movies?.filter((movie) => {
        return movie.title.toLowerCase().includes(searchQuery.toLowerCase());
      }),
    [searchQuery, movies]
  );

  const handleCheckboxChange = React.useCallback((movieId: string) => {
    setSelectedMovies((prev) =>
      prev.includes(movieId)
        ? prev.filter((mId) => mId !== movieId)
        : [...prev, movieId]
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

  return <MovieList movies={filteredMovies} onChange={handleCheckboxChange} />;
});

export default ElectionForm;
