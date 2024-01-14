import Button from "@/components/button";
import { Box, HStack, Input, Spacer, Text } from "@chakra-ui/react";
import ForgotPasswordButton from "../forgot-password-button";

export interface LoginProps {
  username: string;
  handleUsernameChange: (e: any) => void;
  password: string;
  handlePasswordChange: (e: any) => void;
  message: string;
  handleRegisterClick?: () => void;
  isLoading?: boolean;
  handleLoginClick?: () => void;
  handleForgotPasswordClick: () => void;
}

function Login({
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
  message,
  handleRegisterClick,
  isLoading,
  handleLoginClick,
  handleForgotPasswordClick,
}: LoginProps) {
  const isButtonDisabled = !username.trim().length || !password.trim().length;

  return (
    <Box pos="absolute" top="50%" transform="translateY(-50%)">
      <HStack>
        <Text fontSize="sm" fontWeight="bold" mb={4} pl={2}>
          Log in
        </Text>
      </HStack>
      <Box bg="secondary" w="350px" h="200px" borderRadius="15px" p="20px 25px">
        <Text fontSize="xs" color="danger">
          {message}
        </Text>
        <Input
          value={username}
          onChange={handleUsernameChange}
          variant="flushed"
          color="textDark"
          fontSize="sm"
          focusBorderColor="textDark"
          placeholder="Enter username"
          mb={3}
        />
        <Input
          value={password}
          onChange={handlePasswordChange}
          variant="flushed"
          color="textDark"
          fontSize="sm"
          focusBorderColor="textDark"
          placeholder="Enter password"
          type="password"
        />
        <Button
          mt={5}
          w="100%"
          onClick={handleLoginClick}
          isLoading={isLoading}
          isDisabled={isButtonDisabled}
        >
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
        <Spacer />
        <ForgotPasswordButton handleClick={handleForgotPasswordClick} />
      </HStack>
    </Box>
  );
}

export default Login;
