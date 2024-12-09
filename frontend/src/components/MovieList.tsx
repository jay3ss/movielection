import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material";

import { Movie } from "@/types";

interface MovieListProps {
  movies: Movie[];
  onChange: (movieId: string) => void;
}

const MovieList: React.FC<MovieListProps> = React.memo(
  ({ movies, onChange }) => {
    const moviesList = React.useMemo(() => {
      const handleCardClick = (event: React.MouseEvent) => {
        const card = (event.target as HTMLElement).closest(
          ".select-movie"
        ) as HTMLElement;

        if (card) {
          const movieId = card.dataset.id;
          const clickedMovie = movies.filter(
            (movie) => movie.id === movieId
          )[0];
          onChange(clickedMovie.id);
        }
      };
      return (
        <ul className="movie-list" onClick={handleCardClick}>
          {movies.map((movie) => (
            <MovieListItem key={movie.id} movie={movie} />
          ))}
        </ul>
      );
    }, [movies, onChange]);
    return moviesList;
  }
);

interface MovieListItemProps {
  movie: Movie;
  onChange?: (movieId: string) => void;
}

const MovieListItem: React.FC<MovieListItemProps> = React.memo(({ movie }) => {
  return (
    <li
      style={{
        display: "flex",
        padding: 2,
        margin: 3,
        textWrap: "pretty",
        width: "100%",
      }}
      className="movie-list-item"
    >
      <MovieListCard movie={movie} />
    </li>
  );
});

const MovieListCard: React.FC<MovieListItemProps> = React.memo(({ movie }) => {
  const theme = useTheme();

  const checkboxLabel = {
    inputProps: { "aria-label": `Select ${movie.title}`, "data-role": "role" },
  };

  return (
    <Card sx={{ display: "flex", width: "100%" }} className="movie-card">
      <CardMedia
        component="img"
        image={movie.image}
        alt={`Poster for ${movie.title}`}
        sx={{
          width: {
            xs: 77,
            sm: 154,
          },
          height: {
            xs: 116,
            sm: 231,
          },
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <CardContent
          sx={{ flex: "1 0 auto", p: 0.5 }}
          className="movie-details"
        >
          <Typography
            component="div"
            variant="h5"
            sx={{
              fontSize: {
                xs: theme.typography.pxToRem(16),
                sm: theme.typography.pxToRem(24),
              },
              p: 0,
              m: 0,
            }}
          >
            {movie.title}
          </Typography>{" "}
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              color: "text.secondary",
              fontSize: {
                xs: theme.typography.pxToRem(10),
                sm: theme.typography.pxToRem(14),
              },
              p: 0,
              m: 0,
            }}
          >
            {new Date(movie.premiere_date).getFullYear()} · {movie.rating} ·{" "}
            {Math.round(movie.duration)} min{" "}
            <Link
              href={`//imdb.com/title/${movie.imdb}`}
              target="_blank"
              rel="noopener"
              underline="always"
            >
              IMDb
            </Link>
          </Typography>
          <div data-id={movie.id}>
            <FormGroup data-id={movie.id} className="select-movie">
              <FormControlLabel
                control={
                  <Checkbox
                    {...checkboxLabel}
                    id={movie.id}
                    className="select-movie-checkbox"
                  />
                }
                label="Select"
              />
            </FormGroup>
          </div>
        </CardContent>
      </Box>
    </Card>
  );
});

export default MovieList;
