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
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  return (
    <AppContext.Provider
      value={{
        election,
        electionError,
        electionLoading,
        movies,
        movieError,
        movieLoading,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
