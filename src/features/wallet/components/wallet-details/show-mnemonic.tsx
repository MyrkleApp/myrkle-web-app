import { Box, SimpleGrid, Text } from "@chakra-ui/react";

function ShowMnemonic() {
  return (
    <SimpleGrid columns={2} spacing={7}>
      <Box>
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <Text
              key={i}
              fontSize="xs"
              color="textDark"
              borderBottom="1px solid"
              borderColor="textDark"
              mb={1}
              pb={1}
            >
              mnemonic
            </Text>
          ))}
      </Box>
      <Box>
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <Text
              key={i}
              fontSize="xs"
              color="textDark"
              borderBottom="1px solid"
              borderColor="textDark"
              mb={1}
              pb={1}
            >
              mnemonic
            </Text>
          ))}
      </Box>
    </SimpleGrid>
  );
}

export default ShowMnemonic;
