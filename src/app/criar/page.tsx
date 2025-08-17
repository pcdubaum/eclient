"use client";

import { Alert, Input, Breadcrumb, Button, Flex, Heading, Link, Spinner, Stack, Text, Checkbox, Textarea, Menu, Portal } from "@chakra-ui/react";
import Navbar from "../../components/NavBar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Linha from "@/components/Bloco";
import BlocoComponent from "@/components/Bloco";
import { useRequest } from "@/hooks/useRequest";

// Tipos
interface Item {
    pai: number | string;
    id: number;
    tip: string;
    cor: string;
    des: string;
    txtal: string;
    art: string;
}


interface Bloco {
    tip: string;
    cor: string;
    des: string;
    txtal: string;
    art: string;
}


export default function CriarPage() {

    const [nome, setNome] = useState("");
    const [autor, setAutor] = useState("");
    const autorid = localStorage.getItem("id") || "";
    const [disciplina, setDisciplina] = useState("");
    const [assunto, setAssunto] = useState("");
    const [subtopico, setSubtopico] = useState("");
    const [publico, setPublico] = useState(false);
    const [descricao, setDescricao] = useState("");

    // Configura os Blocos com
    const [blocos, setBlocos] = useState<Bloco[]>([]);
    const { request, _loading, _error } = useRequest<{ token: string }>();

    // Adicionar novo bloco
    const handleAdicionarItem = (index: number) => {
        setBlocos((prev) => {
            const newItem: Bloco = {
                tip: "texto",
                cor: "",
                des: "",
                txtal: "left",
                art: "",
            };

            return [
                ...prev.slice(0, index + 1),
                newItem,
                ...prev.slice(index + 1),
            ];
        });
    };

    // Deletar bloco
    const handleDeletarItem = (index: number) => {
        setBlocos((prev) => prev.filter((_, i) => i !== index));
    };


    // Inserir novo bloco antes de um índice
    const insertBefore = (index: number, newItem: Bloco) => {
        setBlocos((prev) => [
            ...prev.slice(0, index),
            { ...newItem }, // cria um NOVO objeto
            ...prev.slice(index),
        ]);
    };

    // Atualizar bloco específico pelo index
    const mudarConteudo = (index: number, updatedItem: Bloco) => {
        setBlocos((prev) =>
            prev.map((bloco, i) => (i === index ? updatedItem : bloco))
        );
    };

    // Mover bloco para cima
    const moveUp = (index: number) => {
        setBlocos((prev) => {
            if (index === 0) return prev; // já é o primeiro, não faz nada
            const newBlocos = [...prev];
            [newBlocos[index - 1], newBlocos[index]] = [newBlocos[index], newBlocos[index - 1]];
            return newBlocos;
        });
    };

    // Mover bloco para baixo
    const moveDown = (index: number) => {
        setBlocos((prev) => {
            if (index === prev.length - 1) return prev; // já é o último
            const newBlocos = [...prev];
            [newBlocos[index], newBlocos[index + 1]] = [newBlocos[index + 1], newBlocos[index]];
            return newBlocos;
        });
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      nome,
      autor,
      disciplina,
      assunto,
      subtopico,
      publico,
      descricao,
      blocos,
    };

    try {
        const token = localStorage.getItem("token");
        console.log("token:", token);
      const response = await request("materias", {
        method: "POST",
        body: payload,
        headers: {
                        Authorization: `Bearer ${token}`,
                    },
      });

      console.log("Resposta da API:", response);
    } catch (err) {
      console.error("Erro ao salvar:", err);
    }
  }
    return (
        <Flex direction='row' flexWrap='wrap'>

            <Navbar />

            <Flex h="auto" width="100%" direction="column" m="auto" justifyContent="center">
                <Flex w="100%" m="auto" background='gray.100' direction="column" mt="0px">


                    <Alert.Root status="warning">
                        <Alert.Indicator />
                        <Alert.Title >
                            Parece que você não está logado, faça o login para criar um novo material.
                        </Alert.Title>
                        <Link href="/" alignSelf="center" fontWeight="medium">
                            Fazer login.
                        </Link>
                    </Alert.Root>

                    <Breadcrumb.Root ml={4} my={4} >
                        <Breadcrumb.List>
                            <Breadcrumb.Item>
                                <Breadcrumb.Link href="/materias">Central</Breadcrumb.Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Separator />
                            <Breadcrumb.Link href="/#">Criar material</Breadcrumb.Link>
                        </Breadcrumb.List>
                    </Breadcrumb.Root>

                </Flex>

                <Flex w="100%" justifyContent="center" bgColor="gray.50" m="0px" boxShadow="dark-lg" p="6" rounded="md" direction="column"          >
                    <form onSubmit={handleSubmit}>
                        <Heading as="h1" size="xl" maxLines={1} textAlign="center" mb="16px">
                            Postar Materia
                        </Heading>

                        <Flex direction="column" width="100%">
                            <Flex w="100%" bgColor="gray.100" m="0px" boxShadow="dark-lg" p="2" rounded="md" direction="column">
                                <Heading as="h1" size="lg" maxLines={1} textAlign="center" mb="16px">
                                    Informações básicas
                                </Heading>
                            </Flex>

                            {/* Capsula */}
                            <Flex w='100%' p={1}>
                                <Heading as="h2" size="md" justifyContent="center" textAlign="left" m='auto' minW="175px" maxLines={1}>
                                    Nome da matéria
                                </Heading>
                                <Input readOnly={false} value={nome} onChange={e => setNome(e.target.value)} maxLines={1} />
                            </Flex>

                            {/* Capsula */}
                            <Flex w='100%' p={1}>
                                <Heading as="h2" size="md" justifyContent="center" textAlign="left" m='auto' minW="175px" maxLines={1}>
                                    Nome do autor
                                </Heading>
                                <Input readOnly={false} value={autor} onChange={e => setAutor(e.target.value)} maxLines={1} />
                            </Flex>

                            {/* Capsula */}
                            <Flex w='100%' p={1}>
                                <Heading as="h2" size="md" justifyContent="center" textAlign="left" m='auto' minW="175px" maxLines={1}>
                                    Nome do autor
                                </Heading>
                                <Input readOnly={true} value={autorid} onChange={e => setAutor(e.target.value)} maxLines={1} />
                            </Flex>

                            {/* Capsula */}
                            <Flex w='100%' p={1}>
                                <Heading as="h2" size="md" justifyContent="center" textAlign="left" m='auto' minW="175px" maxLines={1}>
                                    Disciplina
                                </Heading>
                                <Input readOnly={false} value={disciplina} onChange={e => setDisciplina(e.target.value)} maxLines={1} />

                            </Flex>

                            {/* Capsula */}
                            <Flex w='100%' p={1}>
                                <Heading as="h2" size="md" justifyContent="center" textAlign="left" m='auto' minW="175px" maxLines={1}>
                                    Assunto
                                </Heading>
                                <Input readOnly={false} value={assunto} onChange={e => setAssunto(e.target.value)} maxLines={1} />

                            </Flex>

                            {/* Capsula */}
                            <Flex w='100%' p={1}>
                                <Heading as="h2" size="md" justifyContent="center" textAlign="left" m='auto' minW="175px" maxLines={1}>
                                    Sub tópico
                                </Heading>
                                <Input readOnly={false} value={subtopico} onChange={e => setSubtopico(e.target.value)} maxLines={1} />

                            </Flex>
                            <Checkbox.Root checked={publico} onCheckedChange={e => setPublico(!publico)}>
                                <Checkbox.HiddenInput />
                                <Checkbox.Control />
                                <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
                            </Checkbox.Root>


                        </Flex>

                        <Flex w="100%" bgColor="gray.50" m={0} boxShadow="dark-lg" p="1" rounded="md" direction="column"                >
                            <Heading as="h1" size="lg" maxLines='inherit' textAlign="center" mb="16px">
                                Descrição do Mateial
                            </Heading>

                            <Textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />

                        </Flex>

                        {blocos.map((bloco, index) => (
                            <BlocoComponent
                                key={index}
                                bloco={bloco}
                                index={index}
                                mudarConteudo={mudarConteudo}
                                adicionarNovoItem={handleAdicionarItem}
                                insertBefore={insertBefore}
                                deletarItem={handleDeletarItem}
                                moverParaCima={moveUp}
                                moverParaBaixo={moveDown}


                            />
                        ))}

                        {/* Botão para adicionar item ao bloco */}
                        <Button
                            onClick={() =>
                                handleAdicionarItem(9999) // Adiciona ao final da lista
                            }
                        >
                            Adicionar Item ao Bloco
                        </Button>

                        <Button type="submit" colorScheme="green" mt={4}>
                            Salvar
                        </Button>

                    </form>
                </Flex>
            </Flex>
        </Flex >
    )
}

