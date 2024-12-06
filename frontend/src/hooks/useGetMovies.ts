import { useState, useEffect } from "react";

import { Movie } from "@/types";
// import { apiFetch } from "@/utils/apiFetch";

export const useGetMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://10.0.0.32:8000/api/v0/movies");

        if (!response.ok) {
          console.error("Failed to fetch movies");
          throw new Error("Failed to fetch movies");
        }

        const text = await response.text();

        const json = JSON.parse(text);

        setMovies(json);
        setLoading(false);
      } catch (err) {
        setError(err);
        console.error(err);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};
