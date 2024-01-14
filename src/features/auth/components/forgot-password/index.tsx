import { Box, Flex, HStack, Input, Text, useDisclosure } from "@chakra-ui/react";
import Button from "@/components/button";
import { baseUrl, passwordRegex } from "@/constants";
import { useState } from "react";
import axios from "axios";
import ADD_WALLET_PIPELINE from "../../add-wallet-pipeline";
import Backdrop from "@/components/backdrop";
import ResponseModal from "@/components/response-modal";

export interface CreatePasswordProps {
  handleView: (view: string) => void;
}

function ForgotPassword({ handleView }: CreatePasswordProps) {
  const [username, setUsername] = useState("");
  const [recoveryKey, setRecoveryKey] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [isResetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const isPassword1Valid = password1.match(passwordRegex);
  const isPassword2Valid = password2 === password1;
  const isConfirmEnabled =
    username.trim().length &&
    recoveryKey.trim().length &&
    isPassword1Valid &&
    password1 &&
    isPassword2Valid &&
    password2;

  const handleResetPassword = () => {
    setResetPasswordLoading(true);

    axios
      .post(`${baseUrl}/auth/reset_password/`, {
        username,
        recovery_key: recoveryKey,
        new_password: password1,
      })
      .then(() => {
        setResetPasswordLoading(false);
        setError(false);
        setMessage("Your password has been reset");
        onOpen();
      })
      .catch((err) => {
        setResetPasswordLoading(false);
        setError(true);
        setMessage(err.response.data.errors[0]?.detail);
        onOpen();
      });
  };

  const handleClose = () => {
    onClose();
    setUsername("");
    setPassword1("");
    setPassword2("");
    setRecoveryKey("");
  };

  return (
    <>
      <Box pos="absolute" top="50%" transform="translateY(-50%)">
        <HStack mb={4}>
          <Text fontSize="sm" fontWeight="bold">
            Forgot Password
          </Text>
        </HStack>
        <Box bg="secondary" w="350px" minH="260px" borderRadius="15px" p="20px 20px 30px 20px">
          <Input
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
            variant="flushed"
            focusBorderColor="gray"
            px="10px"
            fontSize="sm"
            color="textDark"
            placeholder="Username"
            name="username"
            mb={3}
          />
          <Input
            value={recoveryKey}
            onChange={(e: any) => setRecoveryKey(e.target.value)}
            variant="flushed"
            focusBorderColor="gray"
            px="10px"
            fontSize="sm"
            color="textDark"
            placeholder="Recovery key"
            mb={3}
          />
          {password1! && !isPassword1Valid && (
            <Text fontSize="xs" color="danger">
              Password must contain at least one lowercase, uppercase, one digit, and one special
              character.
            </Text>
          )}
          <Input
            value={password1}
            onChange={(e: any) => setPassword1(e.target.value)}
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
            onChange={(e: any) => setPassword2(e.target.value)}
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
            onClick={handleResetPassword}
            isDisabled={!isConfirmEnabled}
            isLoading={isResetPasswordLoading}
          >
            confirm
          </Button>
        </Box>
        <Flex justify="space-between" mt={4} px={3}>
          <Text
            fontSize="xs"
            fontWeight="bold"
            // color="primary"
            cursor="pointer"
            onClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
          >
            Log in
          </Text>
          <Text
            fontSize="xs"
            fontWeight="bold"
            // color="primary"
            cursor="pointer"
            onClick={() => handleView(ADD_WALLET_PIPELINE.CREATE_PASSWORD)}
          >
            Register
          </Text>
        </Flex>
      </Box>

      <Backdrop isOpen={isOpen} w="100vw" h="100vh" borderRadius="0" top={0}>
        <ResponseModal isError={isError} message={message} handleClose={handleClose} />
      </Backdrop>
    </>
  );
}

export default ForgotPassword;
