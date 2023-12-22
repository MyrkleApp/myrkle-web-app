import { Box, Flex, Text } from "@chakra-ui/react";

function MintTokenProgress({ currentStep }: { currentStep: number }) {
  return (
    <>
      <Text mb={1}>Mint a token ({currentStep || 0}/4)</Text>
      <Flex justify="space-between" gap={2} mb={4} pr={3}>
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Box
              key={i}
              h="10px"
              flex={1}
              borderRadius="10px"
              bg={currentStep >= i + 1 ? "primary" : "gray"}
            />
          ))}
      </Flex>
    </>
  );
}

export default MintTokenProgress;
