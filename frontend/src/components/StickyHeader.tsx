import React from "react";

import Box from "@mui/material/Box";

import AppTitle from "@/components/AppTitle";
import SearchBar, { SearchBarProps } from "@/components/SearchBar";

const StickyHeader: React.FC<SearchBarProps> = React.memo(
  ({ query, onChange }) => {
    return (
      <Box
        sx={{
          width: "100%",
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 99999,
        }}
      >
        <AppTitle />
        <SearchBar query={query} onChange={onChange} />
      </Box>
    );
  }
);

export default StickyHeader;
