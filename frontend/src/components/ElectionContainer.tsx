import React from "react";

// import CreateElection from "@/components/CreateElection";
import ElectionForm from "@/components/ElectionForm";
import { useGetCurrentElection } from "@/hooks/useGetCurrentElection";

export const ElectionContainer: React.FC = () => {
  const { election, loading, error } = useGetCurrentElection();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>Error: {error}</div>;
  }

  if (!election) {
    return (
      <div>
        <ElectionForm />
      </div>
    );
  }

  return (
    <div>
      <h1>Election Details</h1>
      <p>Created at: {new Date(election.created_at).toLocaleString()}</p>
      <p>Finishes at: {new Date(election.finishes_at).toLocaleString()}</p>
      <p>Movies: {election.movies.map((movie) => movie.title).join(", ")}</p>
    </div>
  );
};
