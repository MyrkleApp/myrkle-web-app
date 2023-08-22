import Button from "@/components/button";
import { Box, CloseButton, Flex, Image, Text, useOutsideClick } from "@chakra-ui/react";
import { useRef } from "react";

export interface AddressModalProps {
  handleClose: () => void;
  qrCodeImage: string;
  address: string;
}

function AddressModal({ handleClose, qrCodeImage, address }: AddressModalProps) {
  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: handleClose,
  });

  return (
    <Box
      ref={ref}
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      h="400px"
      w="270px"
      p={4}
      bg="darker"
      borderRadius="30px"
    >
      <Flex justify="flex-end">
        <CloseButton onClick={handleClose} />
      </Flex>
      <Box px={6} mt={1}>
        <Box bg="#fff" p={2} borderRadius="15px" h="180px" w="100%" mb={3}>
          <Image src={qrCodeImage} alt="" />
        </Box>
        <Box bg="secondary" borderRadius="5px" py={1} px={2} mb={1} cursor="pointer">
          <Text fontSize="2xs" color="textDark" fontWeight="bold">
            {address}
          </Text>
        </Box>
        <Text fontSize="2xs" color="textDark" textAlign="center" mb={4}>
          click to copy address
        </Text>

        <Button w="100%" h="40px" _hover={{ bg: "primary" }}>
          Generate X Address
        </Button>
      </Box>
    </Box>
  );
}

export default AddressModal;
