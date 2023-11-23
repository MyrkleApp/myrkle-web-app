import { Grid, GridItem, HStack, Image, Text, useDisclosure } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import tokenPlaceholder from "@/assets/token-placeholder.png";
import txnIn from "@/assets/txn-in.png";
import txnOut from "@/assets/txn-out.png";
import Backdrop from "@/components/backdrop";
import TxnModal from "./txn-modal";
import { formatDate, formatNumber } from "@/helpers";

export interface TxnCardProps {
  txn: any;
  isCreditTxn: boolean;
}

function TxnCard({ txn, isCreditTxn }: TxnCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        onClick={onOpen}
      >
        <GridItem rowSpan={1} colSpan={4} display="flex" alignItems="center">
          <HStack>
            <Image src={isCreditTxn ? txnIn : txnOut} alt="" h="23px" />
            <Text fontSize="xs">Payment transaction</Text>
          </HStack>
        </GridItem>
        <GridItem rowSpan={1} colSpan={3} display="flex" alignItems="center">
          <HStack>
            <Image
              src={txn.token.toLowerCase() === "xrp" ? xrpLogo : tokenPlaceholder}
              alt="logo"
              h="28px"
            />
            <Text fontSize="xs" textTransform="uppercase">
              {txn.token}
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
          <Text fontSize="xs" textTransform="uppercase" color={isCreditTxn ? "success" : "danger"}>
            {`${isCreditTxn ? "+" : "-"}${formatNumber(txn.amount)}`}
          </Text>
        </GridItem>
        <GridItem rowSpan={1} colSpan={3} display="flex" alignItems="center">
          <Text fontSize="xs" color="#fff">
            {formatDate(txn.timestamp)}
          </Text>
        </GridItem>
      </Grid>

      <Backdrop isOpen={isOpen}>
        <TxnModal txn={txn} handleClose={onClose} />
      </Backdrop>
    </>
  );
}

export default TxnCard;
