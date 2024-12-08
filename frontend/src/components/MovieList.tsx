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

import {
  useTheme,
  // useMediaQuery,
} from "@mui/material";

import { Movie } from "@/types";

interface MovieListProps {
  movies: Movie[];
  checked: (movie: Movie) => boolean;
  onChange: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <MovieListItem key={movie.id} movie={movie} />
      ))}
    </ul>
  );
};

interface MovieListItemProps {
  movie: Movie;
  checked?: (movie: Movie) => boolean;
  onChange?: (movie: Movie) => void;
}

const MovieListItem: React.FC<MovieListItemProps> = React.memo(
  ({ movie, checked = null, onChange = null }) => {
    console.log(checked, onChange);
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
  }
);

const MovieListCard: React.FC<MovieListItemProps> = React.memo(({ movie }) => {
  const theme = useTheme();

  const checkboxLabel = {
    inputProps: { "aria-label": `Select ${movie.title}` },
  };

  return (
    <Card sx={{ display: "flex", width: "100%" }}>
      <CardMedia
        component="img"
        image={movie.image}
        alt={`Post for ${movie.title}`}
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
          <FormGroup>
            <FormControlLabel
              control={<Checkbox {...checkboxLabel} />}
              label="Select"
            />
          </FormGroup>
        </CardContent>
      </Box>
    </Card>
  );
});

export default MovieList;
