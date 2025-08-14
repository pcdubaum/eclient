"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Box,
    Heading,
    Text,
    Button,
    VStack,
    Spinner
} from "@chakra-ui/react";

interface Perfil {
    nome: string;
    email: string;
    data_registro: string;
    role: string;
}

export default function CentralPage() {
    const [nomeUsuario, setNomeUsuario] = useState<string>("");
    const [perfil, setPerfil] = useState<Perfil | null>(null);
    const [loadingPerfil, setLoadingPerfil] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const nome = localStorage.getItem("nomeUsuario");


        if (!token) {
            router.push("/"); // volta pro login se não tiver token
            return;
        }

        setNomeUsuario(nome || "Usuário");
    }, [router]);

    async function buscarPerfil() {
        setLoadingPerfil(true);
        setPerfil(null);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/");
                return;
            }

            const id = localStorage.getItem("userId");
            const res = await fetch(`http://localhost:3001/api/users/perfil`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                throw new Error("Erro ao buscar perfil");
            }

            const data = await res.json();
            setPerfil(data);
        } catch (err) {
            console.error(err);
        } finally {
            console.log("Perfil carregado com sucesso" + perfil);
            setLoadingPerfil(false);
        }
    }

    return (
        <Box p={8} textAlign="center">
            <Heading>Central</Heading>
            <Text fontSize="xl" mt={4}>
                Bem-vindo, <strong>{nomeUsuario}</strong>!
            </Text>

            <Button mt={6} colorScheme="blue" onClick={buscarPerfil}>
                Ver Perfil
            </Button>

            {loadingPerfil && <Spinner mt={4} />}

            {perfil && (
                <VStack spacing={2} mt={6} align="start">
                     <Text><strong>ID:</strong> {perfil._id}</Text>
                    <Text><strong>Nome:</strong> {perfil.nome}</Text>
                    <Text><strong>Email:</strong> {perfil.email}</Text>
                    <Text>
                        <strong>Data de Registro:</strong>{" "}
                        {new Date(perfil.data_registro).toLocaleDateString("pt-BR")}
                    </Text>
                    <Text><strong>Role:</strong> {perfil.role}</Text>
                </VStack>
            )}
        </Box>
    );
}
