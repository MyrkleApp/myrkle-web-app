import Button from "@/components/button";
import ArrowLeftIcon from "@/icons/arrow-left";
import Layout from "@/layout";
import { Flex, HStack, SimpleGrid, Spacer, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import FlagCard from "../components/flag-card";
import ROUTES from "@/routes";

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
        <Button mr="7.5%">Save Changes</Button>
      </HStack>

      <Flex justify="center" h="calc(100% - 70px)" mt="20px" overflow="hidden scroll">
        <SimpleGrid w="85%" h="100%" columns={[1, null, 2, 3]} spacing="50px">
          <FlagCard title="Flag title" description="Flag description" />
          {Array(15)
            .fill(null)
            .map((_, i) => (
              <FlagCard key={i} />
            ))}
        </SimpleGrid>
      </Flex>
    </Layout>
  );
}

export default Flags;
