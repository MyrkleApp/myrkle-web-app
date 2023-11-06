import { MotionBox } from "@/components/motion-elements";
import { Box, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";

export interface XummTxnModalProps {
  qrCodeImage: string;
}

function XummTxnModal({ qrCodeImage }: XummTxnModalProps) {
  return (
    <MotionBox
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      h="330px"
      w="550px"
      p={4}
      bg="darker"
      borderRadius="15px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Flex justify="space-between" px={3}>
        <Text fontWeight="bold">Scan Code</Text>
      </Flex>
      <SimpleGrid columns={2} spacing={3} px={3} mt={3} h="calc(100% - 60px)">
        <Box>
          <Text fontSize="xs">Lorem ipsum dolor sit amet, consectetur adipis</Text>
        </Box>
        <Flex
          justify="center"
          align="center "
          bg="#fff"
          border="2px solid"
          borderColor="success"
          borderRadius="10px"
          h="100%"
          p={2}
        >
          <Image src={qrCodeImage || ""} alt="connect xumm" />
        </Flex>
      </SimpleGrid>
    </MotionBox>
  );
}

export default XummTxnModal;
