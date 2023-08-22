import Button from "@/components/button";
import Input from "@/components/input";
import { MotionBox } from "@/components/motion-elements";
import { Box, CloseButton, Flex, HStack, Text, useOutsideClick } from "@chakra-ui/react";
import { useRef } from "react";

export interface XAddressFormModalProps {
  handleClose: () => void;
}

function XAddressFormModal({ handleClose }: XAddressFormModalProps) {
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
      h="200px"
      w="270px"
      p={4}
      bg="darker"
      borderRadius="30px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Flex justify="flex-end">
        <CloseButton onClick={handleClose} />
      </Flex>
      <Box px={6} mt={1}>
        <HStack mb={1}>
          <Text fontSize="2xs" color="textDark" fontWeight="bold">
            Destination tag
          </Text>
          {/* info component goes here */}
        </HStack>

        <Input mb={2} />

        <Button w="100%" h="40px" bg="secondary" color="textDark">
          confirm
        </Button>
      </Box>
    </MotionBox>
  );
}

export default XAddressFormModal;
