import Button from "@/components/button";
import Input from "@/components/input";
import { MotionBox } from "@/components/motion-elements";
import {
  Box,
  CloseButton,
  Flex,
  HStack,
  Spacer,
  Spinner,
  Text,
  useOutsideClick,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import NftAddCard from "./nft-add-card";
import { AnimatePresence } from "framer-motion";
import { useDebounce } from "react-use";
import { useLazyGetNftMetaDataQuery, useReceiveNftMutation } from "../../redux/xrp.api";
import ProceedModal from "../proceed-modal";
import { useSelector } from "react-redux";
import { selectAddress, selectNet } from "@/features/wallet/redux/wallet.selectors";
import { nftFormatter } from "@/helpers";

export interface AddNftModalProps {
  handleClose: () => void;
}

function AddNftModal({ handleClose }: AddNftModalProps) {
  // ========================================================================================
  // state & ref
  // ========================================================================================

  const [showNftCard, setShowNftCard] = useState(false);
  const [nftId, setNftId] = useState("");
  const [view, setView] = useState<"nft" | "proceed">("nft");

  const ref = useRef(null);

  // ========================================================================================
  // selectors
  // ========================================================================================

  const address = useSelector(selectAddress);
  const net = useSelector(selectNet);

  // ========================================================================================
  // api
  // ========================================================================================

  const [
    getNftMetaData,
    { data: nftData, isLoading: isNftMetaDataLoading, isError: isNftMetaDataError },
  ] = useLazyGetNftMetaDataQuery();
  const [receiveNft, { isLoading: isReceiveNftLoading }] = useReceiveNftMutation();

  // ========================================================================================
  // effects
  // ========================================================================================

  useOutsideClick({
    ref,
    handler: handleClose,
  });

  useDebounce(
    () => {
      if (!nftId.trim()) {
        setShowNftCard(false);
        return;
      }

      getNftMetaData({ id: nftId, net })
        .unwrap()
        .then(() => setShowNftCard(true))
        .catch(() => setShowNftCard(false));
    },
    100,
    [nftId],
  );

  // ========================================================================================
  // handlers
  // ========================================================================================

  const handleReset = () => {
    setNftId("");
    setShowNftCard(false);
  };

  const handleReload = () => {
    // const id = nftId
    // setNftId("")
    // setTimeout(() => setNftId(id), 150)
  };

  const handleConfirmClick = () => {
    setView("proceed");
  };

  const handleProceed = () => {
    receiveNft({ nft_sell_id: nftId, sender_addr: address });
  };

  return (
    <AnimatePresence>
      {view === "nft" && (
        <MotionBox
          ref={ref}
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          h="200px"
          w="270px"
          p={4}
          bg="darker"
          borderRadius="15px"
          animate={{
            opacity: 1,
            height: showNftCard ? "380px" : "200px",
            width: showNftCard ? "350px" : "270px",
            transition: { type: "spring", stiffness: 100 },
          }}
        >
          <Flex justify="flex-end">
            <CloseButton onClick={handleClose} />
          </Flex>
          <Box px={4} mt={1} h="calc(100% - 50px)" pos="relative">
            <AnimatePresence>
              {showNftCard && (
                <MotionBox
                  h="170px"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <NftAddCard
                    name={nftData?.name}
                    image={nftFormatter(nftData?.image)}
                    handleReload={handleReload}
                    handleReset={handleReset}
                  />
                </MotionBox>
              )}
            </AnimatePresence>

            <Box pos="absolute" w="100%" px="inherit" left={0} bottom={0}>
              <HStack mb={1}>
                <Text fontSize="2xs" color="#fff" fontWeight="bold">
                  NFT Sell ID
                </Text>
                <Spacer />
                {isNftMetaDataLoading && <Spinner size="sm" />}
              </HStack>

              <Input
                mb={4}
                value={nftId}
                onChange={(e: any) => setNftId(e.target.value)}
                border={isNftMetaDataError ? "1px solid red" : "1px solid transparent"}
                _hover={{ border: isNftMetaDataError ? "1px solid red" : "1px solid transparent" }}
              />

              <Button
                w="100%"
                h="40px"
                bg="secondary"
                color="textDark"
                isDisabled={!nftData || isNftMetaDataError}
                onClick={handleConfirmClick}
              >
                confirm
              </Button>
            </Box>
          </Box>
        </MotionBox>
      )}

      {view === "proceed" && (
        <ProceedModal
          text="Are you sure you want to proceed?"
          isLoading={isReceiveNftLoading}
          handleClose={handleClose}
          handleProceed={handleProceed}
        />
      )}
    </AnimatePresence>
  );
}

export default AddNftModal;
