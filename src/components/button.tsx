import { Button as ChakraButton } from "@chakra-ui/react";

function Button({ ...props }: any) {
  return (
    <ChakraButton
      bg="primary"
      borderRadius="10px"
      h="40px"
      color="#fff"
      fontSize="sm"
      fontWeight="bold"
      {...props}
    />
  );
}

export default Button;
