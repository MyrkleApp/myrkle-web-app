import ArrowLeftIcon from "@/icons/arrow-left";
import Layout from "@/layout";
import { Box, Flex, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ListCreatedEscrows from "../components/list-created-escrows";

function CreatedEscrows() {
  const navigate = useNavigate();

  return (
    <Layout>
      <HStack h="50px" px={3}>
        <ArrowLeftIcon cursor="pointer" onClick={() => navigate(-1)} />
      </HStack>

      <Flex justify="center" align="center" h="calc(100% - 50px)" bg="dark" borderRadius="20px">
        <Box h="calc(100% - 80px)" w="calc(100% - 100px)" overflow="hidden auto">
          <ListCreatedEscrows />
        </Box>
      </Flex>
    </Layout>
  );
}

export default CreatedEscrows;
