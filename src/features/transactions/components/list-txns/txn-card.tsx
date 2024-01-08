import { Grid, GridItem, HStack, Image, Text, useDisclosure } from "@chakra-ui/react";
import txnIn from "@/assets/txn-in.png";
import txnOut from "@/assets/txn-out.png";
import Backdrop from "@/components/backdrop";
import TxnModal from "./txn-modal";
import { ellipsisAtCenter, formatDate, formatNumber } from "@/helpers";
import TokenIcon from "@/features/shared/components/token-icon";
import HoverDetail from "@/components/hover-detail";

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
            <TokenIcon token={txn.token} issuer={txn?.issuer} h="28px" />

            <Text
              fontSize="xs"
              textTransform="uppercase"
              pos="relative"
              _hover={{
                "#hover-detail": {
                  display: "block",
                },
              }}
            >
              <HoverDetail text={txn.token} top={-5} />
              {ellipsisAtCenter(txn.token, 6, true)}
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
