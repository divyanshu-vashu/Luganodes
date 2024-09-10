import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      // ff0000
      main: "#920f07", 
      light: "#eb7350",
      border1: grey[300],
    },
    text: {
      invert: "#f8f8f8",
    },
  },
});

export default theme;
