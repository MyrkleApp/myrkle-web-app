import { Text } from "@chakra-ui/react";

export interface ForgotPasswordButtonProps {
  handleClick: () => void;
  [anyProp: string]: any;
}

function ForgotPasswordButton({ handleClick, ...props }: ForgotPasswordButtonProps) {
  return (
    <>
      <Text fontSize="xs" cursor="pointer" onClick={handleClick} {...props}>
        Forgot password?
      </Text>
    </>
  );
}

export default ForgotPasswordButton;
