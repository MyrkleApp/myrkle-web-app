import { Textarea } from "@chakra-ui/react";

function TextArea({ ...props }) {
  return (
    <Textarea
      h="100px"
      bg="secondary"
      color="textDark"
      border="1px solid transparent"
      resize="none"
      _focusVisible={{
        outline: "none",
      }}
      {...props}
    />
  );
}

export default TextArea;
