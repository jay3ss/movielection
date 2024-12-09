import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface StartElectionButtonProps {
  movieIds: string[];
}

const StartElectionButton: React.FC<StartElectionButtonProps> = ({
  movieIds,
}) => {
  console.log(movieIds);
  return (
    <Box
      sx={{
        width: "100%",
        position: "sticky",
        bottom: 0,
        backgroundColor: "white",
        zIndex: 99999,
        p: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button variant="contained">Start Election</Button>
    </Box>
  );
};

export default StartElectionButton;
