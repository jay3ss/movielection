import React from "react";

import DebouncedInput from "@/components/DebouncedInput";

export interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange }) => {
  return (
    <DebouncedInput
      className="search-bar"
      placeholder="Search for movies"
      onChange={onChange}
    />
  );
};

export default SearchBar;
