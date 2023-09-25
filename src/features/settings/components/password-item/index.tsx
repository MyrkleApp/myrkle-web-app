import EyeIcon from "@/icons/eye";
import { Flex, Text } from "@chakra-ui/react";

export interface PasswordItemProps {
  name: string;
}

function PasswordItem({ name }: PasswordItemProps) {
  return (
    <Flex
      justify="space-between"
      align="center"
      bg="darker"
      h="50px"
      p={2}
      mb={2}
      borderRadius="30px"
    >
      <Text fontSize="sm" ml={5}>
        {name}
      </Text>
      <Flex justify="flex-end" align="center" bg="dark" w="70%" h="100%" p={2} borderRadius="30px">
        <EyeIcon />
      </Flex>
    </Flex>
  );
}

export default PasswordItem;
