// theme.ts
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    azul: {
      50:  "#e6f0fa",
      100: "#b3d1f2",
      200: "#80b3eb",
      300: "#4d94e3",
      400: "#1a75db",
      500: "#005ec4",
      600: "#004a99",
      700: "#00366f",
      800: "#002345",
      900: "#00111f",
    },
    vermelho: {
      50:  "#fde8e8",
      100: "#f9baba",
      200: "#f58c8c",
      300: "#f15e5e",
      400: "#ed3030",
      500: "#d41717",
      600: "#a51111",
      700: "#760c0c",
      800: "#470707",
      900: "#230303",
    },
    laranja: {
      50:  "#fff3e6",
      100: "#ffd9b3",
      200: "#ffbf80",
      300: "#ffa64d",
      400: "#ff8c1a",
      500: "#e67300",
      600: "#b35900",
      700: "#804000",
      800: "#4d2600",
      900: "#261300",
    },
  },
  components: {
    Button: {
      variants: {
        solid: (props: any) => ({
          bg: `${props.colorScheme}.500`,
          color: "white",
          _hover: {
            bg: `${props.colorScheme}.600`,
          },
          _active: {
            bg: `${props.colorScheme}.700`,
          },
        }),
        outline: (props: any) => ({
          border: "2px solid",
          borderColor: `${props.colorScheme}.500`,
          color: `${props.colorScheme}.500`,
          _hover: {
            bg: `${props.colorScheme}.50`,
          },
        }),
      },
    },
  },
});

export default theme;
