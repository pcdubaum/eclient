"use client";

import { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import { useRequest } from "@/hooks/useRequest";
import Navbar from "../../components/NavBar";

interface Materia {
    nome: string;
    tema: string;
    autor: string;
    autorId: string;
}

export default function CentralPage() {
    const [materias, setMaterias] = useState<Materia[]>([]);
    const [pagina, setPagina] = useState(1);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    const { request, _loading, _error } = useRequest<{ token: string }>();

    async function fetchMaterias() {
        setLoading(true);
        setErro("");

        try {
            const token = localStorage.getItem("token");

            const data = await request(`materias?sort=-criadoEm&page=${pagina}&limit=10&fields=nome,tema,autor,autorId`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMaterias(data?.results || []);
        } catch (err) {
            setErro("Erro ao carregar matérias");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMaterias();
    }, [pagina]);

    return (
        <Stack>
            <Navbar></Navbar>
            <Heading>Central</Heading>

            {erro && (
                <Text color="red.500" fontWeight="bold">
                    {erro}
                </Text>
            )}

            {loading ? (
                <Spinner size="xl" />
            ) : (
                <Stack spacing={4}>
                    {materias.map((mat, idx) => (
                        <Box
                            key={idx}
                            borderWidth="1px"
                            borderRadius="lg"
                            p={4}
                            bg="gray.50"
                        >
                            <Text><strong>Nome:</strong> {mat.nome}</Text>
                            <Text><strong>Tema:</strong> {mat.tema}</Text>
                            <Text><strong>Autor:</strong> {mat.autor}</Text>
                            <Text><strong>Autor ID:</strong> {mat.autorId}</Text>
                        </Box>
                    ))}
                </Stack>
            )}

           
        </Stack>
    );
}
