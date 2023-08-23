import SendAssets from "@/features/transactions/components/send-assets";
import Layout from "@/layout";
import { Grid, GridItem, HStack, Text } from "@chakra-ui/react";

function Transaction() {
  return (
    <Layout>
      <Grid templateColumns="repeat(12, 1fr)" gap={4} h="100%" px={2}>
        <GridItem colSpan={6}>
          <HStack h="45px">
            <Text fontWeight="bold">Send Assets</Text>
          </HStack>

          <SendAssets />
        </GridItem>

        <GridItem colSpan={6} border="1px solid red"></GridItem>
      </Grid>
    </Layout>
  );
}

export default Transaction;
