"use client";

import { Flex, Text, Icon } from "@chakra-ui/react";
import { MdErrorOutline } from "react-icons/md";

type AlertProps = {
  message: string;
};

export function ErrorAlert({ message }: AlertProps) {
  return (
    <Flex
      align="center"
      bg="red.100"
      color="red.800"
      borderRadius="md"
      p={3}
      gap={2}
    >
      <Icon as={MdErrorOutline} boxSize={5} />
      <Text>{message}</Text>
    </Flex>
  );
}