import Button from "@/components/button";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Text,
  VStack,
  useOutsideClick,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import ItemLabel from "@/components/item-label";
import { MotionBox } from "@/components/motion-elements";
import ArrowLeftIcon from "@/icons/arrow-left";
import { AnimatePresence } from "framer-motion";
import ArrowRightFlatIcon from "@/icons/arrow-right-flat";
import ListTxnsEditables from "./editables";
import { selectNet, selectNetwork } from "@/features/wallet/redux/wallet.selectors";
import { useSelector } from "react-redux";
import { useGetPayTxnInfoQuery } from "@/features/shared/redux/xrp.api";
import RenderElement from "@/components/render-element";
import ListFlags from "./list-flags";
import { ellipsisAtCenter, formatNumber } from "@/helpers";
import TokenIcon from "@/features/shared/components/token-icon";
import HoverDetail from "@/components/hover-detail";

export interface TxnModalProps {
  txn: any;
  handleClose: () => void;
}

// testnet: https://test.bithomp.com/explorer/
// mainnet: https://bithomp.com/explorer/
// devnet: https://dev.bithomp.com/explorer/

const explorerBaseUrl = {
  testnet: "https://test.bithomp.com/explorer",
  mainnet: "https://bithomp.com/explorer",
  devnet: "https://dev.bithomp.com/explorer",
};

function TxnModal({ txn, handleClose }: TxnModalProps) {
  const [isFlagView, setFlagView] = useState(false);

  const ref = useRef(null);

  const network = useSelector(selectNetwork);
  const net = useSelector(selectNet);

  const isSuccessTxn = txn?.result?.toLowerCase()?.includes("success");

  const { data: txnInfo, isLoading: isTxnInfoLoading } = useGetPayTxnInfoQuery({
    net,
    id: txn?.txid,
  });

  useOutsideClick({
    ref,
    handler: handleClose,
  });

  return (
    <Flex
      ref={ref}
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      w="700px"
      h="470px"
      maxH="100%"
      bg="darker"
      p={5}
      borderRadius="20px"
    >
      <Flex h="calc(100% - 10px)" w="100%" pr={1} mt="5px" gap="30px" overflow="hidden auto">
        <Box w="50%">
          <Button
            className="font-face-proxima-nova-black"
            w="100%"
            h="35px"
            fontWeight="bold"
            mb={7}
            leftIcon={<ArrowLeftIcon ml="-70px" />}
            onClick={handleClose}
          >
            Transaction Detail
          </Button>
          <HStack px={4} bg="darkest" borderRadius="10px" mb={4}>
            <TokenIcon token={txn?.token} issuer={txn?.issuer} />
            <Text
              className="font-face-proxima-nova-black"
              fontSize="3xl"
              pos="relative"
              _hover={{
                "#hover-detail": {
                  display: "block",
                },
              }}
            >
              <HoverDetail text={txn?.token} />
              {ellipsisAtCenter(txn?.token, 6, true)}
            </Text>
            <Spacer />
            <Text
              className="font-face-proxima-nova-black"
              fontSize="3xl"
              pos="relative"
              _hover={{
                "#hover-detail": {
                  display: "block",
                },
              }}
            >
              <HoverDetail text={formatNumber(txn?.amount)} />
              {ellipsisAtCenter(formatNumber(txn?.amount), 10, true)}
            </Text>
          </HStack>
          <Box px={4} py="2px" bg="dark" borderRadius="10px" mb={2}>
            <ItemLabel title="Transaction index" fontSize="2xs" mb={0} />
            <RenderElement isLoading={isTxnInfoLoading} w="100%" h="20px">
              <Text fontSize="sm">{txnInfo?.index}</Text>
            </RenderElement>
          </Box>
          <Box px={4} py="2px" bg="dark" borderRadius="10px" mb={2}>
            <ItemLabel title="Transaction ID" fontSize="2xs" mb={0} />
            <Text fontSize="sm">{txn?.txid}</Text>
          </Box>
          <Box px={4} py="2px" bg="dark" borderRadius="10px" mb={2} pos="relative">
            <ItemLabel title="Sender" fontSize="2xs" mb={0} />
            <Text fontSize="sm">{txn?.sender}</Text>
            <Box w="5px" h="20px" bg="danger" pos="absolute" left={0} top={0} mt="14px" />
          </Box>
          <Box px={4} py="2px" bg="dark" borderRadius="10px" mb={5} pos="relative">
            <ItemLabel title="Receiver" fontSize="2xs" mb={0} />
            <Text fontSize="sm">{txn?.receiver}</Text>
            <Box w="5px" h="20px" bg="primary" pos="absolute" left={0} top={0} mt="14px" />
          </Box>
          <Button
            w="100%"
            textAlign="left"
            justifyContent="space-between"
            onClick={() => setFlagView(true)}
            rightIcon={<ArrowRightFlatIcon fontSize="xs" />}
          >
            View Flags
          </Button>
        </Box>

        <Box w="50%" pos="relative" h="100%">
          <HStack pos="absolute" right={0}>
            <VStack spacing={0} align="flex-end">
              <Text fontSize="xs">Status</Text>
              <Text fontSize="2xs" mt={-1} color={isSuccessTxn ? "success" : "danger"}>
                {isSuccessTxn ? "Success" : "Failed"}
              </Text>
            </VStack>
            <Box h="30px" w="30px" borderRadius="50%" bg={isSuccessTxn ? "success" : "danger"} />
          </HStack>
          <AnimatePresence>
            {isFlagView && (
              <MotionBox
                pos="absolute"
                mt="3px"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
              >
                <IconButton
                  size="xs"
                  isRound
                  bg="primary"
                  aria-label={"back"}
                  onClick={() => setFlagView(false)}
                >
                  <ArrowLeftIcon />
                </IconButton>
              </MotionBox>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isFlagView ? (
              <ListFlags txnInfo={txnInfo} />
            ) : (
              <>
                <MotionBox
                  w="100%"
                  h="295px"
                  pos="absolute"
                  top="62px"
                  bg="#292929"
                  borderRadius="15px"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  zIndex={0}
                >
                  <Box
                    w="53%"
                    h="calc(100% - 20px)"
                    pos="absolute"
                    top="10px"
                    right="10px"
                    bg="dark"
                    borderRadius="15px"
                    zIndex={-1}
                  />
                  <ListTxnsEditables
                    txn={txn}
                    txnInfo={txnInfo}
                    isTxnInfoLoading={isTxnInfoLoading}
                  />
                  <Button
                    as="a"
                    href={`${explorerBaseUrl[network]}/${txn.txid}`}
                    target="_blank"
                    w="100%"
                    mt={9}
                  >
                    View Block in Explorer
                  </Button>
                </MotionBox>
              </>
            )}
          </AnimatePresence>

          {/* <AnimatePresence>{isFlagView && <ListFlags txnInfo={txnInfo} />}</AnimatePresence> */}

          {/* <Button
            as="a"
            href={`${explorerBaseUrl[network]}/${txn.txid}`}
            target="_blank"
            w="100%"
            // pos="absolute"
            // bottom="7px"
          >
            View Block in Explorer
          </Button> */}
        </Box>
      </Flex>
    </Flex>
  );
}

export default TxnModal;
