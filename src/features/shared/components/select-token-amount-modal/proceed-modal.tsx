import Button from "@/components/button";
import { MotionBox } from "@/components/motion-elements";
import { CloseButton, Flex, Text, useOutsideClick } from "@chakra-ui/react";
import { useRef } from "react";

export interface ProceedModalProps {
  text: string;
  isLoading: boolean;
  handleProceed: () => void;
  handleClose: () => void;
}

function ProceedModal({ text, isLoading, handleProceed, handleClose }: ProceedModalProps) {
  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: handleClose,
  });

  return (
    <MotionBox
      ref={ref}
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      h="250px"
      w="300px"
      p={6}
      bg="darker"
      borderRadius="15px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Flex justify="flex-end" pl={3}>
        <CloseButton onClick={handleClose} />
      </Flex>

      <Text fontWeight="bold" mt={3} mb={10}>
        {text}
      </Text>

      <Button
        bg="primary"
        w="100%"
        isLoading={isLoading}
        onClick={handleProceed}
        _hover={{ bg: "primary" }}
      >
        Proceed
      </Button>
    </MotionBox>
  );
}

export default ProceedModal;
