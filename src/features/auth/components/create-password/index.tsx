import { Box, HStack, Input, Text } from "@chakra-ui/react";
import LoginButtonText from "../login-button-text";
import Button from "@/components/button";
import { passwordRegex } from "@/constants";

export interface CreatePasswordProps {
  password1: string;
  password2: string;
  handlePassword1Change: (e: any) => void;
  handlePassword2Change: (e: any) => void;
  handleConfirmClick: () => void;
  handleLoginClick: () => void;
  isLoading?: boolean;
}

function CreatePassword({
  password1,
  password2,
  handlePassword1Change,
  handlePassword2Change,
  handleConfirmClick,
  handleLoginClick,
  isLoading,
}: CreatePasswordProps) {
  const isPassword1Valid = password1.match(passwordRegex);
  const isPassword2Valid = password2 === password1;
  const isConfirmEnabled = isPassword1Valid && password1 && isPassword2Valid && password2;

  return (
    <Box pos="absolute" top="50%" transform="translateY(-50%)">
      <HStack mb={4}>
        <Text fontSize="sm" fontWeight="bold">
          Create Password
        </Text>
      </HStack>
      <Box bg="secondary" w="350px" minH="200px" borderRadius="15px" p="20px 20px 30px 20px">
        {password1! && !isPassword1Valid && (
          <Text fontSize="xs" color="danger">
            Password must contain at least one lowercase, uppercase, one digit, and one special
            character.
          </Text>
        )}
        <Input
          value={password1}
          onChange={handlePassword1Change}
          variant="flushed"
          focusBorderColor="gray"
          px="10px"
          fontSize="sm"
          color="textDark"
          placeholder="Enter password"
          mb={3}
          type="password"
        />
        {password2! && !isPassword2Valid && (
          <Text fontSize="xs" color="danger">
            Passwords must match
          </Text>
        )}
        <Input
          value={password2}
          onChange={handlePassword2Change}
          variant="flushed"
          focusBorderColor="gray"
          px="10px"
          fontSize="sm"
          color="textDark"
          placeholder="Re-enter password"
          mb={5}
          type="password"
        />
        <Button
          w="100%"
          onClick={handleConfirmClick}
          isDisabled={!isConfirmEnabled}
          isLoading={isLoading}
        >
          confirm
        </Button>
      </Box>
      <LoginButtonText handleLoginClick={handleLoginClick} />
    </Box>
  );
}

export default CreatePassword;
