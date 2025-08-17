"use client";

import { Box, Button, Flex, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import Navbar from "../../components/NavBar";
import { useRouter } from "next/navigation";

export default function MateriasPage() {

    const router = useRouter();

    return (
        <Flex direction='row' flexWrap='wrap'>

            <Navbar />

            <Flex direction='collum' flexWrap='wrap' margin='auto' padding='16px' width='100%' justifyContent='center' alignItems='center'>

                <Flex
                    minW="360px"
                    maxW="392px"
                    w="auto"
                    h="610px"
                    display="flex"
                    flexDirection="column"
                    padding="12px"
                    m="16px"
                    textAlign="left"
                    boxShadow="dark-lg"
                    p="6"
                    rounded="md"
                    border="1px solid #ccc"
                    _hover={{ bg: "blue.200", color: "white" }}
                    transition="background-color 0.3s, color 0.3s"
                >
                    <Heading as="h1" size="xl" color="black">
                        Crie
                    </Heading>
                    <Text color="gray.600">
                        Cansado de ter de estudar a mesma matéria várias vezes para diferentes concursos?
                    </Text>
                    <Text color="gray.600">
                        Aqui você pode criar seu próprio material, grave as anotações mais importantes.
                    </Text>
                    <Text color="gray.600">
                        Aquela pegadinha que você sempre cai, aquele mnemônico que você sempre se esquece, material de resumo. Qualquer tipo de conteúdo ficará gravado para você.
                    </Text>

                    <Button bg="blue.500" mt="auto" onClick={() => router.push("/criar")}>
                        Criar Material
                    </Button>
                </Flex>

                <Flex
                    minW="360px"
                    maxW="392px"
                    w="auto"
                    h="610px"
                    display="flex"
                    flexDirection="column"
                    padding="12px"
                    m="16px"
                    textAlign="left"
                    boxShadow="dark-lg"
                    p="6"
                    rounded="md"
                    border="1px solid #ccc"
                    _hover={{ bg: "red.200", color: "white" }}
                    transition="background-color 0.3s, color 0.3s"
                >
                    <Heading as="h1" size="xl" color="black">
                        Explore
                    </Heading>
                    <Text color="gray.600">
                        Cansado de ter de estudar a mesma matéria várias vezes para diferentes concursos?
                    </Text>
                    <Text color="gray.600">
                        Aqui você pode criar seu próprio material, grave as anotações mais importantes.
                    </Text>
                    <Text color="gray.600">
                        Aquela pegadinha que você sempre cai, aquele mnemônico que você sempre se esquece, material de resumo. Qualquer tipo de conteúdo ficará gravado para você.
                    </Text>

                    <Button bgColor="red.500" mt="auto">
                        Compartilhe
                    </Button>
                </Flex>

                <Flex
                    minW="360px"
                    maxW="392px"
                    w="auto"
                    h="610px"
                    display="flex"
                    flexDirection="column"
                    padding="12px"
                    m="16px"
                    textAlign="left"
                    boxShadow="dark-lg"
                    p="6"
                    rounded="md"
                    border="1px solid #ccc"
                    _hover={{ bg: "red.200", color: "white" }}
                    transition="background-color 0.3s, color 0.3s"
                >
                    <Heading as="h1" size="xl" color="black">
                        Explore
                    </Heading>
                    <Text color="gray.600">
                        Cansado de ter de estudar a mesma matéria várias vezes para diferentes concursos?
                    </Text>
                    <Text color="gray.600">
                        Aqui você pode criar seu próprio material, grave as anotações mais importantes.
                    </Text>
                    <Text color="gray.600">
                        Aquela pegadinha que você sempre cai, aquele mnemônico que você sempre se esquece, material de resumo. Qualquer tipo de conteúdo ficará gravado para você.
                    </Text>

                    <Button bgColor="red.500" mt="auto">
                        Explorar
                    </Button>
                </Flex>

                <Flex
                    minW="360px"
                    maxW="392px"
                    w="auto"
                    h="610px"
                    display="flex"
                    flexDirection="column"
                    padding="12px"
                    m="16px"
                    textAlign="left"
                    boxShadow="dark-lg"
                    p="6"
                    rounded="md"
                    border="1px solid #ccc"
                    _hover={{ bg: "red.200", color: "white" }}
                    transition="background-color 0.3s, color 0.3s"
                >
                    <Heading as="h1" size="xl" color="black">
                        Explore
                    </Heading>
                    <Text color="gray.600">
                        Cansado de ter de estudar a mesma matéria várias vezes para diferentes concursos?
                    </Text>
                    <Text color="gray.600">
                        Aqui você pode criar seu próprio material, grave as anotações mais importantes.
                    </Text>
                    <Text color="gray.600">
                        Aquela pegadinha que você sempre cai, aquele mnemônico que você sempre se esquece, material de resumo. Qualquer tipo de conteúdo ficará gravado para você.
                    </Text>

                    <Button bgColor="red.500" mt="auto">
                        Espaço
                    </Button>
                </Flex>

            </Flex>

        </Flex>
    );
}
