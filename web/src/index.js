import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./router";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </React.StrictMode>
);
