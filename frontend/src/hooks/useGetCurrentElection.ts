import { useState, useEffect } from "react";
import { Election } from "@/types";

export function useGetCurrentElection() {
  const [election, setElection] = useState<Election | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null); // Reset error state before making a request

    fetch("http://10.0.0.32:8000/api/v0/election") // Replace with your actual API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch election: ${response.statusText}`);
        }
        return response.json();
      })
      .then((json) => {
        setElection(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "An unknown error occurred");
        setLoading(false);
        setElection(null);
      });
  }, []);

  return { election, loading, error }; // Return all three states
}
