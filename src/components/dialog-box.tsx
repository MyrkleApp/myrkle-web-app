import { Box, Text, useOutsideClick } from "@chakra-ui/react";
import { useRef } from "react";

export interface DialogBoxProps {
  children?: React.ReactNode;
  handleClose: () => void;
  message?: string;
  [anyProp: string]: any;
}

function DialogBox({ children, handleClose, message, ...props }: DialogBoxProps) {
  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: handleClose,
  });

  return (
    <Box
      ref={ref}
      w="300px"
      h="200px"
      bg="darker"
      borderRadius="15px"
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      p={8}
      {...props}
    >
      {message && (
        <Text fontWeight="bold" fontSize="sm">
          {message}
        </Text>
      )}
      {children}
    </Box>
  );
}

export default DialogBox;
