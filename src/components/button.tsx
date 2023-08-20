import { Button as ChakraButton } from "@chakra-ui/react";

function Button({ ...props }: any) {
  return (
    <ChakraButton
      bg="primary"
      borderRadius="10px"
      h="45px"
      color="#fff"
      fontSize="xs"
      fontWeight="bold"
      {...props}
    />
  );
}

export default Button;
