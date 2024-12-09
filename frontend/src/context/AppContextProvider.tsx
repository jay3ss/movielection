import React from "react";

import { AppContext } from "./AppContext";

import { useGetCurrentElection } from "@/hooks/useGetCurrentElection";
import { useGetMovies } from "@/hooks/useGetMovies";

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    election,
    loading: electionLoading,
    error: electionError,
  } = useGetCurrentElection();
  const { movies, loading: movieLoading, error: movieError } = useGetMovies();
  const [searchQuery, setQuery] = React.useState<string>("");

  const setSearchQuery = React.useCallback(
    (value: string) => setQuery(value),
    []
  );

  const value = React.useMemo(
    () => ({
      election,
      electionError,
      electionLoading,
      movies,
      movieError,
      movieLoading,
      searchQuery,
      setSearchQuery,
    }),
    [
      election,
      electionError,
      electionLoading,
      movies,
      movieError,
      movieLoading,
      searchQuery,
      setSearchQuery,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
