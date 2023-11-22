import { MotionBox } from "@/components/motion-elements";
import { Box, Image, Text } from "@chakra-ui/react";
import Skeleton1 from "./skeleton";

export interface XummTxnModalProps {
  qrCodeImage: string;
}

function XummTxnModal({ qrCodeImage }: XummTxnModalProps) {
  return (
    <MotionBox
      bg="secondary"
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      w="230px"
      h="250px"
      borderRadius="15px"
      p="30px 20px 30px 20px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {qrCodeImage ? (
        <Box bg="#fff" borderRadius="15px" w="83%" minH="75%" mx="auto">
          <Image src={qrCodeImage} alt="" />
        </Box>
      ) : (
        <Skeleton1 borderRadius="0" w="83%" mx="auto" h="75%" />
      )}
      <Text fontSize="xs" textAlign="center" mt={8}>
        Scan QR code to sign transaction
      </Text>
    </MotionBox>
  );
}

export default XummTxnModal;
