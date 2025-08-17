"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ErrorAlert } from "@/components/Alert";
import { useRequest } from "@/hooks/useRequest";

export default function HomePage() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();
  const { request, loading, error } = useRequest<{ token: string }>();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault(); // evita GET com query string

    const data = await request("users/login", {
      method: "POST",
      body: { email: nome, senha },
    });

    if (data?.token) {
      console.log("Login bem-sucedido:", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.usuario._id);
      localStorage.setItem("nome", data.usuario.nome);
      localStorage.setItem("role", data.usuario.role);
      router.push("/materias");
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <Stack spacing={6} p={8} maxW="sm" mx="auto">
        <Heading size="lg" textAlign="center">
          Login
        </Heading>

        {error && <ErrorAlert message={error} />}

        <Box>
          <Text mb={2}>Nome do usuário</Text>
          <Input
            name="username"
            autoComplete="username"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </Box>

        <Box>
          <Text mb={2}>Senha</Text>
          <Input
            name="password"
            autoComplete="current-password"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </Box>

        <Button type="submit" size="lg" fontWeight="bold" isLoading={loading}>
          IN
        </Button>
      </Stack>
    </form>
  );
}
