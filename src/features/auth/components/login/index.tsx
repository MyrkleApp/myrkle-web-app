import Button from "@/components/button";
import { Box, HStack, Input, Text } from "@chakra-ui/react";

export interface LoginProps {
  password: string;
  handlePasswordChange: (e: any) => void;
  handleRegisterClick?: () => void;
  isLoading?: boolean;
  handleLoginClick?: () => void;
}

function Login({
  password,
  handlePasswordChange,
  handleRegisterClick,
  isLoading,
  handleLoginClick,
}: LoginProps) {
  return (
    <Box pos="absolute" top="50%" transform="translateY(-50%)">
      <HStack>
        <Text fontSize="sm" fontWeight="bold" mb={4} pl={2}>
          Log in
        </Text>
      </HStack>
      <Box bg="secondary" w="350px" h="150px" borderRadius="15px" p="20px 25px">
        <Input
          value={password}
          onChange={handlePasswordChange}
          variant="flushed"
          color="textDark"
          fontSize="sm"
          focusBorderColor="textDark"
          placeholder="Enter password"
        />
        <Button mt={5} w="100%" onClick={handleLoginClick} isLoading={isLoading}>
          login
        </Button>
      </Box>

      <HStack mt={4} pl={3}>
        <Text fontSize="xs">Don't own a wallet?</Text>
        <Text
          fontSize="xs"
          fontWeight="bold"
          color="primary"
          cursor="pointer"
          onClick={handleRegisterClick}
        >
          Register
        </Text>
      </HStack>
    </Box>
  );
}

export default Login;
