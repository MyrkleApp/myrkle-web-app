import { Box, SimpleGrid, Text } from "@chakra-ui/react";

function ShowSecretNumbers() {
  return (
    <SimpleGrid columns={2} spacing={7}>
      <Box>
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Text
              key={i}
              fontSize="xs"
              color="textDark"
              borderBottom="1px solid"
              borderColor="textDark"
              mb={3}
              pb={2}
            >
              031847
            </Text>
          ))}
      </Box>
      <Box>
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Text
              key={i}
              fontSize="xs"
              color="textDark"
              borderBottom="1px solid"
              borderColor="textDark"
              mb={3}
              pb={2}
            >
              031847
            </Text>
          ))}
      </Box>
    </SimpleGrid>
  );
}

export default ShowSecretNumbers;
