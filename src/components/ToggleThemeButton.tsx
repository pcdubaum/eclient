"use client";

import { Button } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";

export default function ToggleThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} colorScheme="brand">
      Modo: {colorMode === "light" ? "🌞 Claro" : "🌙 Escuro"}
    </Button>
  );
}