import { Box, Text, useOutsideClick } from "@chakra-ui/react";
import { useRef } from "react";

export interface DialogBoxProps {
  handleClose: () => void;
  message: string;
}

function DialogBox({ handleClose, message }: DialogBoxProps) {
  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: handleClose,
  });

  return (
    <Box
      w="300px"
      h="200px"
      bg="darker"
      borderRadius="15px"
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      p={8}
    >
      <Text fontWeight="bold" fontSize="sm">
        {message}
      </Text>
    </Box>
  );
}

export default DialogBox;
