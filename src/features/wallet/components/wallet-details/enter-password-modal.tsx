import Button from "@/components/button";
import Input from "@/components/input";
import { MotionBox } from "@/components/motion-elements";
import { Box, HStack, Text, useOutsideClick } from "@chakra-ui/react";
import { useRef } from "react";
import { TAccountInfoModal } from "../../types";

export interface EnterPasswordModalProps {
  handleClose: () => void;
  handleAccountInfoModal: (modal: TAccountInfoModal) => void;
}

function EnterPasswordModal({ handleClose, handleAccountInfoModal }: EnterPasswordModalProps) {
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
      h="190px"
      w="270px"
      p={4}
      bg="darker"
      borderRadius="20px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Box px={3} mt={2}>
        <HStack mb={3}>
          <Text fontSize="sm" color="textDark" fontWeight="bold">
            Secret
          </Text>
        </HStack>

        <Input mb={5} />

        <Button
          w="100%"
          h="40px"
          bg="secondary"
          color="textDark"
          onClick={() => handleAccountInfoModal("secrets")}
        >
          confirm
        </Button>
      </Box>
    </MotionBox>
  );
}

export default EnterPasswordModal;
