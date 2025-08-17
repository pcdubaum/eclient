"use client";
import { Button, Flex, HStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useRequest } from "@/hooks/useRequest";
import { MouseEvent } from "react";

const Navbar = () => {

  const { request, loading, error } = useRequest<{ token: string }>();
  const router = useRouter();

  const handleLogoff = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const data = await request('usuarios/logoff',
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    } catch (err) {
      console.error("Erro ao fazer logoff:", error);
    } finally {
      // Remover dados do localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("id");
      localStorage.removeItem("role");

      router.push("/");
    }
  }

return (
  <Flex w="100%" h="90px" direction="column" bgColor={"blue.700"} color="white" p={0} m={0} >
    
  </Flex>
);
}

export default Navbar;
