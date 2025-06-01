import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#0D1B2A",
        color: "white",
      },
    },
  },
  colors: {
    primary: {
      500: "#1E90FF",
    },
    secondary: {
      500: "#FFD700",
    },
  },
});

export default theme;