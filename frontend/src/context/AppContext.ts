import React from "react";

import { Election, Movie } from "@/types";

export interface AppContextState {
  election: Election;
  electionError: string;
  electionLoading: boolean;
  movies: Movie[];
  movieError: Error;
  movieLoading: boolean;
  searchQuery: string;
  setSearchQuery: (term: string) => void;
}

export const AppContext = React.createContext<AppContextState | undefined>(
  undefined
);
