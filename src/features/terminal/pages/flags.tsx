import ArrowLeftIcon from "@/icons/arrow-left";
import Layout from "@/layout";
import { Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ListFlags from "../components/list-flags";

function Flags() {
  const navigate = useNavigate();

  return (
    <Layout>
      <HStack h="50px" px={3}>
        <HStack onClick={() => navigate(-1)}>
          <ArrowLeftIcon cursor="pointer" />
          <Text fontWeight="bold" fontSize="sm">
            Flags
          </Text>
        </HStack>
        <Spacer />
        {/* <Button mr="7.5%">Save Changes</Button> */}
      </HStack>

      <Flex justify="center" h="calc(100% - 70px)" mt="20px" overflow="hidden scroll">
        <ListFlags />
      </Flex>
    </Layout>
  );
}

export default Flags;
