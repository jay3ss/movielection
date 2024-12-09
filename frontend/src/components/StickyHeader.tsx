import React from "react";

import Box from "@mui/material/Box";
import AppTitle from "@/components/AppTitle";
import SearchBar, { SearchBarProps } from "@/components/SearchBar";

import ElectionTimePicker from "@/components/ElectionTimePicker";

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
          pb: 2,
          pt: 1,
        }}
      >
        <AppTitle />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <SearchBar query={query} onChange={onChange} />
          <ElectionTimePicker />
        </Box>
      </Box>
    );
  }
);

export default StickyHeader;
