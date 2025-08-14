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
  Flex
} from "@chakra-ui/react";
import { ErrorAlert } from "@/components/Alert";

export default function HomePage() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");

    if (!nome || !senha) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Aqui o "email" e "password" devem seguir o que sua API espera
        body: JSON.stringify({
          email: nome,
          senha: senha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Usuário ou senha inválidos.");
      }

      // Salvar token no localStorage
      // Sucesso: salvar token e nome no localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("nomeUsuario", nome);
      localStorage.setItem("id", data.usuario._id);
      router.push("/central");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErro(err.message);
      } else {
        setErro("Erro inesperado. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Flex
      height="100vh"
      align="center"
      justify="center"
      bg="white"
    >
      <Flex
        w="392px"
        h="605px"
        p={6}
        flexDirection="column"
        textAlign="left"
        boxShadow="dark-lg"
        borderWidth="1px"
        borderColor="gray.300"
        rounded="md"
        bg="white"
      >
        <form onSubmit={handleLogin} autoComplete="on">
          <Stack spacing={6} p={8} maxW="sm" mx="auto">
            <Heading size="lg" textAlign="center">
              Login
            </Heading>

            {erro && <ErrorAlert message={erro} />}

            <Box>
              <Text mb={2}>Nome do usuário</Text>
              <Input
                name="username"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                autoComplete="username"
              />
            </Box>

            <Box>
              <Text mb={2}>Senha</Text>
              <Input
                name="password"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                autoComplete="current-password"
              />
            </Box>

            <Button
              type="submit"
              size="lg"
              fontWeight="bold"
              isLoading={loading}
              isDisabled={loading}
            >
              IN
            </Button>
          </Stack>
        </form>
      </Flex>
    </Flex>
  );
}
