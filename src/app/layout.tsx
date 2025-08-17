"use client";

import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from "@chakra-ui/react";



const buttonRecipe = defineRecipe({
  base: {
    fontWeight: "bold",
  },
  variants: {
    variant: {
      solid: {
        bg: "azul.500",
        color: "white",
        _hover: { bg: "azul.600" },
      },
    },
  },
  defaultVariants: {
    variant: "solid", // agora não é colorScheme
  },
});

import type { ReactNode } from "react";
const config = defineConfig({

  theme: {
    tokens: {
      colors: {
        azul: {
          50: { value: "#e6f0fa" },
          100: { value: "#b3d1f2" },
          200: { value: "#80b3eb" },
          300: { value: "#4d94e3" },
          400: { value: "#1a75db" },
          500: { value: "#005ec4" }, // cor principal
          600: { value: "#004a99" },
          700: { value: "#00366f" },
          800: { value: "#002345" },
          900: { value: "#00111f" },
        },
        vermelho: {
          50: { value: "#fde8e8" },
          100: { value: "#f9baba" },
          200: { value: "#f58c8c" },
          300: { value: "#f15e5e" },
          400: { value: "#ed3030" },
          500: { value: "#d41717" }, // cor principal
          600: { value: "#a51111" },
          700: { value: "#760c0c" },
          800: { value: "#470707" },
          900: { value: "#230303" },
        },

        laranja: {
          50: { value: "#fff3e6" },
          100: { value: "#ffd9b3" },
          200: { value: "#ffbf80" },
          300: { value: "#ffa64d" },
          400: { value: "#ff8c1a" },
          500: { value: "#e67300" }, // cor principal
          600: { value: "#b35900" },
          700: { value: "#804000" },
          800: { value: "#4d2600" },
          900: { value: "#261300" },
        },
      },
    },
    recipes: {
      button: buttonRecipe,
    },
  },
});

const system = createSystem(defaultConfig, config);



export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ChakraProvider value={system}>
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
