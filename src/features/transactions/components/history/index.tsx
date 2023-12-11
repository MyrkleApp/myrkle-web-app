import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import ListTxns from "../list-txns";

function History() {
  return (
    <Box
      h="calc(100% - 45px)"
      maxH={["600px", null, null, "100%"]}
      bg="dark"
      borderRadius="30px"
      p={8}
    >
      <Grid h="45px" templateColumns="repeat(13, 1fr)" gap={4}>
        <GridItem colSpan={4}>
          <Text fontSize="15px" fontWeight="bold">
            Transaction Type
          </Text>
        </GridItem>
        <GridItem colSpan={3}>
          <Text fontSize="15px" fontWeight="bold">
            Asset Name
          </Text>
        </GridItem>
        <GridItem colSpan={3} display="flex" justifyContent="center">
          <Text fontSize="15px" fontWeight="bold">
            Amount
          </Text>
        </GridItem>
        <GridItem colSpan={3}>
          <Text fontSize="15px" fontWeight="bold">
            Date
          </Text>
        </GridItem>
      </Grid>

      <Box h="calc(100% - 45px)" overflow="hidden auto">
        <ListTxns />
      </Box>
    </Box>
  );
}

export default History;
