import React from "react";

import Input from "@mui/material/Input";

export interface SearchBarProps {
  query: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onChange }) => {
  return (
    <Input
      className="search-bar"
      type="text"
      placeholder="Search for movies"
      value={query}
      onChange={onChange}
      sx={
        {
          // width: "100%",
          // backgroundColor: "white",
        }
      }
    />
  );
};

export default SearchBar;
