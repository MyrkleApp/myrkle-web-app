import { Text } from "@chakra-ui/react";

function ForgotPassword({ ...props }: any) {
  return (
    <>
      <Text fontSize="xs" {...props}>
        Forgot password?
      </Text>
    </>
  );
}

export default ForgotPassword;
