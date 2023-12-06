import { Box, Image, Text, VStack } from "@chakra-ui/react";
import underConstructionImage from "@/assets/under-construction.gif";

export interface UnderConstructionProps {
  text?: string;
}

function UnderConstruction({ text }: UnderConstructionProps) {
  return (
    <Box w="100vw" h="100vh" bg="#151515">
      <Box
        w="250px"
        // h="400px"
        pos="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <VStack>
          <Image src={underConstructionImage} alt="" />
          <Text color="#fff" fontWeight="bold" textAlign="center" mt={5} mb={3}>
            {text || "Not available on mobile or tablet, please use a PC or desktop."}
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}

export default UnderConstruction;
