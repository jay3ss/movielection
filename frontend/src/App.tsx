import AppTitle from "@/components/AppTitle";
import { ElectionContainer } from "@/components/ElectionContainer";

import { useGetCurrentElection } from "@/hooks/useGetCurrentElection";

import "./App.css";

function App() {
  const { election, loading, error } = useGetCurrentElection();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <AppTitle />
      <div className="card">
        <ElectionContainer />
      </div>
    </>
  );
}

export default App;
