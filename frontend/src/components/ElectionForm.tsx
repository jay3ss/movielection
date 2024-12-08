import React from "react";

import Typography from "@mui/material/Typography";

import MovieList from "@/components/MovieList";
import SearchBar from "@/components/SearchBar";
import { useGetMovies } from "@/hooks/useGetMovies";
import { Movie } from "@/types";

const ElectionForm = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [selectedMovies, setSelectedMovies] = React.useState<Movie[]>([]);

  const { movies, error, loading } = useGetMovies();

  const renderCount = React.useRef(0);

  const filteredMovies: Movie[] = React.useMemo(
    () =>
      movies?.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [movies, searchQuery]
  );

  const handleSearchChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
      console.log(searchQuery);
    },
    [searchQuery]
  );

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
    <React.Fragment>
      {/* sticky search input: NOTE: make this sticky!*/}
      <SearchBar query={searchQuery} onChange={handleSearchChange} />

      <MovieList
        movies={filteredMovies}
        onChange={handleCheckboxChange}
        checked={isChecked}
      />
    </React.Fragment>
  );
};

export default ElectionForm;
