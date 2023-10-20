import ArrowLeftIcon from "@/icons/arrow-left";
import Layout from "@/layout";
import { Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ROUTES from "@/routes";
import ListFlags from "../components/list-flags";

function Flags() {
  return (
    <Layout>
      <HStack h="50px" px={3}>
        <Link to={ROUTES.TERMINAL}>
          <HStack>
            <ArrowLeftIcon cursor="pointer" />
            <Text fontWeight="bold" fontSize="sm">
              Flags
            </Text>
          </HStack>
        </Link>
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
