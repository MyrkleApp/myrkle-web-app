import { Input as ChakraInput } from "@chakra-ui/react";

function Input({ ...props }) {
  return (
    <ChakraInput
      h="40px"
      bg="secondary"
      color="textDark"
      border="1px solid transparent"
      _focusVisible={{
        outline: "none",
      }}
      {...props}
    />
  );
}

export default Input;
