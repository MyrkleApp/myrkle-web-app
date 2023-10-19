import Button from "@/components/button";
import { MotionBox } from "@/components/motion-elements";
import { Box, CloseButton, Flex, Image, Text, useOutsideClick } from "@chakra-ui/react";
import { useRef } from "react";

export interface AddressModalProps {
  handleClose: () => void;
  qrCodeImage: string;
  address: string;
  handleXAddress: () => void;
  hideXAddressButton?: boolean;
}

function AddressModal({
  handleClose,
  qrCodeImage,
  address,
  handleXAddress,
  hideXAddressButton,
}: AddressModalProps) {
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
      h="400px"
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

        {!hideXAddressButton && (
          <Button w="100%" h="40px" _hover={{ bg: "primary" }} onClick={handleXAddress}>
            Generate X Address
          </Button>
        )}
      </Box>
    </MotionBox>
  );
}

export default AddressModal;
