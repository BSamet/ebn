import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Exo 2",
      textTransform: "none",
      fontSize: 18,
    },
  },
});
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById("root")
);
