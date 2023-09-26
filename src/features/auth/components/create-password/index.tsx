import { Box, HStack, Input, Text } from "@chakra-ui/react";
import LoginButtonText from "../login-button-text";
import Button from "@/components/button";

export interface CreatePasswordProps {
  handleConfirmClick: () => void;
  handleLoginClick: () => void;
}

function CreatePassword({ handleConfirmClick, handleLoginClick }: CreatePasswordProps) {
  return (
    <Box pos="absolute" top="50%" transform="translateY(-50%)">
      <HStack mb={4}>
        <Text fontSize="sm" fontWeight="bold">
          Create Password
        </Text>
      </HStack>
      <Box bg="secondary" w="280px" h="200px" borderRadius="15px" p="20px 20px 30px 20px">
        <Input
          variant="flushed"
          focusBorderColor="gray"
          px="10px"
          fontSize="sm"
          color="textDark"
          placeholder="Enter password"
          mb={3}
        />
        <Input
          variant="flushed"
          focusBorderColor="gray"
          px="10px"
          fontSize="sm"
          color="textDark"
          placeholder="Re-enter password"
          mb={5}
        />
        <Button w="100%" onClick={handleConfirmClick}>
          confirm
        </Button>
      </Box>
      <LoginButtonText handleLoginClick={handleLoginClick} />
    </Box>
  );
}

export default CreatePassword;
