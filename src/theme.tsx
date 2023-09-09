import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: "#00DF16",
    secondary: "#3D3D3D",
    dark: "#5757573B",
    darker: "#242424",
    darkest: "#151515",
    success: "#00DF16",
    danger: "#FF0000",
    textDark: "#858585",
  },
  components: {
    Table: {
      variants: {
        simple: {
          th: {
            borderColor: "transparent",
          },
          td: {
            borderColor: "transparent",
          },
        },
      },
    },
  },
});

export default theme;
