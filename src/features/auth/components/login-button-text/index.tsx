import { HStack, Text } from "@chakra-ui/react";

export interface LoginButtonTextProps {
  handleLoginClick?: () => void;
  [anyProp: string]: any;
}

function LoginButtonText({ handleLoginClick, ...props }: LoginButtonTextProps) {
  return (
    <HStack mt={4} pl={3} {...props}>
      <Text fontSize="xs">already own a wallet?</Text>
      <Text
        fontSize="xs"
        fontWeight="bold"
        color="primary"
        cursor="pointer"
        onClick={handleLoginClick}
      >
        Log in
      </Text>
    </HStack>
  );
}

export default LoginButtonText;
