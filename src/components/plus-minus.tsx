import { HStack, Text } from "@chakra-ui/react";
import Button from "./button";
import PlusIcon from "@/icons/plus";

function PlusMinus() {
  return (
    <HStack bg="secondary" w="160px" p={1} justify="space-between" borderRadius="5px">
      <Button h="35px" w="35px" bg="#585858" borderRadius="5px">
        <PlusIcon fontSize="sm" />
      </Button>

      <Text fontSize="sm" fontWeight="bold">
        12
      </Text>

      <Button h="35px" w="35px" bg="#585858" borderRadius="5px">
        <PlusIcon fontSize="sm" />
      </Button>
    </HStack>
  );
}

export default PlusMinus;
