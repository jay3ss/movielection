import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material";

import ElectionContainer from "@/components/ElectionContainer";
import ErrorBoundary from "@/components/ErrorBoundary";

import "./App.css";

const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Container
          maxWidth="md"
          className="container"
          sx={{
            p: {
              xs: 2,
            },
          }}
        >
          <ElectionContainer />
        </Container>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
