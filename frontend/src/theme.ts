import { createTheme } from "@mui/material/styles";

/**
 * Theme configuration.
 */
const theme = createTheme({
  palette: {
    primary: {
      main: "#5ACCCC",
    },
    secondary: {
      main: "#FABD33",
    },
  },
  typography: {
    fontFamily: "Mulish, Arial",
  },
});

export default theme;
