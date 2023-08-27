import { Grid, GridItem, HStack, Image, Text } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import txnIn from "@/assets/txn-in.png";

function TxnCard() {
  return (
    <>
      <Grid
        h="60px"
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(13, 1fr)"
        borderRadius="10px"
        bg="#D9D9D905"
        gap={2}
        px={2}
        pl={4}
        mb={3}
        cursor="pointer"
      >
        <GridItem rowSpan={1} colSpan={4} display="flex" alignItems="center">
          <HStack>
            <Image src={txnIn} alt="" h="23px" />
            <Text fontSize="xs">Payment transaction</Text>
          </HStack>
        </GridItem>
        <GridItem rowSpan={1} colSpan={3} display="flex" alignItems="center">
          <HStack>
            <Image src={xrpLogo} alt="logo" h="28px" />
            <Text fontSize="xs" textTransform="uppercase">
              usd
            </Text>
          </HStack>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="xs" textTransform="uppercase" color="success">
            +23
          </Text>
        </GridItem>
        <GridItem rowSpan={1} colSpan={3} display="flex" alignItems="center">
          <Text fontSize="xs" color="#fff">
            03.02.2023
          </Text>
        </GridItem>
      </Grid>
    </>
  );
}

export default TxnCard;
