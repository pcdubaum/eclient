"use client";

import React, { useState } from "react";
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Textarea,
  Text,
  Center,
  Portal,
  Select,
  createListCollection
} from "@chakra-ui/react";

// Tipos
export interface Bloco {
  tip: string;
  cor: string;
  des: string;
  txtal: string;
  art: string;
}

interface Props {
  bloco: Bloco;
  index: number;
  mudarConteudo: (index: number, updatedItem: Bloco) => void;
  adicionarNovoItem: (index: number, newItem: Bloco) => void;
  deletarItem: (id: number) => void;
  insertBefore: (index: number, newItem: Bloco) => void;
  moverParaCima: (index: number) => void;
  moverParaBaixo: (index: number) => void;
}

const BlocoComponent: React.FC<Props> = ({
  bloco,
  index,
  mudarConteudo,
  adicionarNovoItem,
  deletarItem,
  insertBefore,
  moverParaCima,
  moverParaBaixo
}) => {

  const [cor, setCor] = useState<string[]>([])
  const [tipo, setTipo] = useState<string[]>([])

  // Atualiza o bloco atual
  const handleAtualizarItem = (
    campo: keyof Bloco,
    valor: string
  ) => {
    mudarConteudo(index, { ...bloco, [campo]: valor });
  };

  // Cria um novo bloco no final do array
  const handleAdicionarItem = () => {
    const newItem: Bloco = {
      tip: "Texto",
      cor: "",
      des: "",
      txtal: "left",
      art: "",
    };

    // insere como último item
    adicionarNovoItem(9999, newItem);
  };


  const cores = createListCollection({
    items: [
      { label: "Sem destaque", value: "null" },
      { label: "Amarelo", value: "yellow.100" },
      { label: "Azul", value: "blue.100" },
      { label: "Ciano", value: "teal.100" },
      { label: "Verde", value: "green.100" },
      { label: "Laranja", value: "orange.100" },
      { label: "Rosa", value: "pink.100" },
      { label: "Vermelho", value: "red.100" },
    ],
  })

    const types = createListCollection({
    items: [
      { label: "Titulo", value: "titulo" },
      { label: "Subtitulo", value: "sub" },
      { label: "Texto", value: "texto" },
      { label: "Fórmula", value: "formula" },
      { label: "Código", value: "codigo" },
    ],
  })


  return (
    <Flex w="100%" justifyContent="center" m="16px" direction="row" bg={bloco.cor || "white"} p="16px" borderRadius="8px" boxShadow="md">
      {/* Menus de opções */}
      <Flex direction="column" >

        <Select.Root
          collection={cores}
          width="280px"
          value={cor}

          onValueChange={(e) => {
            const novaCor = e.value;
            setCor(novaCor);
            handleAtualizarItem("cor", novaCor[0]);
          }}
        >
          <Select.HiddenSelect />
          <Select.Label>Selecione uma cor.</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Selecione uma cor." />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {cores.items.map((cor) => (
                  <Select.Item item={cor} key={cor.value}>
                    {cor.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>

        <Select.Root
          collection={types}
          width="280px"
          value={tipo}

          onValueChange={(e) => {
            const novoTipo = e.value;
            setTipo(novoTipo);
            handleAtualizarItem("tip", novoTipo[0]);
          }}
        >
          <Select.HiddenSelect />
          <Select.Label>Tipo.</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Texto" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {types.items.map((type) => (
                  <Select.Item item={type} key={type.value}>
                    {type.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>

      </Flex>


      {/* Área de texto */}
      <Textarea
        placeholder="Digite seu conteúdo aqui..."
        value={bloco.des}
        onChange={(e) => handleAtualizarItem("des", e.target.value)}
      />

      {/* Botões de controle */}
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        m="16px"
      >
        <Button m={1} bgColor={"green.500"} onClick={() =>
          insertBefore(index, {
            tip: "texto",
            cor: "",
            des: "",
            txtal: "left",
            art: "",
          })
        }
        >
          +
        </Button>
        <Button m={1} onClick={() => moverParaCima(index)}>↑</Button>
        <Button m={1} onClick={() => moverParaCima(index)}>↓</Button>
        <Button m={1} bgColor="red.500" onClick={() => deletarItem(index)}>
          x
        </Button>
      </Flex>
    </Flex>
  );
};

export default BlocoComponent;
