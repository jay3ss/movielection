import React from "react";

import { Grid2 as Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

import AppTitle from "@/components/AppTitle";
import ElectionForm from "@/components/ElectionForm";
import { useGetCurrentElection } from "@/hooks/useGetCurrentElection";

const ElectionContainer: React.FC = () => {
  const { election, loading, error } = useGetCurrentElection();

  if (loading) return <Typography align="center">Loading...</Typography>;
  if (error) {
    console.error(error);
    return <Typography align="center">Error: {error}</Typography>;
  }

  if (!election) {
    return (
      <Grid container spacing={2} className="election-container">
        <Grid size={{ xs: 12 }}>
          <AppTitle />
          <ElectionForm />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} className="election-container">
      <Grid size={{ xs: 12 }}>
        <h1>Election Details</h1>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography>
          Created at: {new Date(election.created_at).toLocaleString()}
        </Typography>
        <Typography>
          Finishes at: {new Date(election.finishes_at).toLocaleString()}
        </Typography>
        <Typography>
          Movies: {election.movies.map((movie) => movie.title).join(", ")}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ElectionContainer;
