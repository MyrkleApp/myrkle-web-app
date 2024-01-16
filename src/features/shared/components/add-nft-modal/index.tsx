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
import { useEffect, useRef, useState } from "react";
import NftAddCard from "./nft-add-card";
import { AnimatePresence } from "framer-motion";
import { useDebounce } from "react-use";
import {
  useLazyGetNftInfoQuery,
  useLazyGetNftOfferInfoQuery,
  useReceiveNftMutation,
} from "../../redux/xrp.api";
import { useLazyGetNftMetaData2Query } from "../../redux/token.api";
import { useSelector } from "react-redux";
import { selectAddress, selectNet } from "@/features/wallet/redux/wallet.selectors";
import { isObjectEmpty } from "@/helpers";
import { TTxnPipeline } from "../../types";
import MyrkleLoader from "@/components/myrkle-loader";
import ResponseModal from "@/components/response-modal";
import XummTxnModal from "@/components/xumm-txn-modal";
import useSubmitTxn from "../../hooks/use-submit-txn";

export interface AddNftModalProps {
  handleClose: () => void;
}

// 00080000ADFDB77A8B3A255EB4DEC33759232E724309D0702DCBAB9C00000002

function AddNftModal({ handleClose }: AddNftModalProps) {
  const [
    { isSubmitTxnSuccess, xummTxnQrCode, submitTxnResponseMsg },
    { handleSubmitTxn, resetSubmitTxnResponse },
  ] = useSubmitTxn("nft");

  // ========================================================================================
  // state & ref
  // ========================================================================================

  const [showNftCard, setShowNftCard] = useState(false);
  const [nftSellId, setNftSellId] = useState("");
  const [view, setView] = useState<TTxnPipeline>("default");

  const ref = useRef(null);

  // ========================================================================================
  // selectors
  // ========================================================================================

  const address = useSelector(selectAddress);
  const net = useSelector(selectNet);

  // ========================================================================================
  // api
  // ========================================================================================

  const [getNftOfferInfo, { isLoading: isNftOfferInfoLoading }] = useLazyGetNftOfferInfoQuery();
  const [getNftInfo, { isLoading: isNftInfoLoading }] = useLazyGetNftInfoQuery();
  const [getNftMetaData, { data: nftMetaData, isLoading: isNftMetaDataLoading }] =
    useLazyGetNftMetaData2Query();

  const [receiveNft] = useReceiveNftMutation();

  const isLoading = isNftOfferInfoLoading || isNftInfoLoading || isNftMetaDataLoading;

  // ========================================================================================
  // effects
  // ========================================================================================

  useOutsideClick({
    ref,
    handler: () => {
      if (view === "loading") return;
      handleClose();
    },
  });

  const handleReceiveNft = () => {
    setView("loading");

    receiveNft({
      sender_addr: address,
      nft_sell_id: nftSellId,
    })
      .unwrap()
      .then((res) => {
        handleSubmitTxn(res);
      })
      .catch(() => setView("error-1"));
  };

  useEffect(() => {
    if (xummTxnQrCode) {
      setView("xumm-qr-code");
    }
  }, [xummTxnQrCode]);

  useEffect(() => {
    if (isSubmitTxnSuccess === null) return;

    if (isSubmitTxnSuccess) {
      setView("success");
    } else setView("error-2");
  }, [isSubmitTxnSuccess]);

  useDebounce(
    () => {
      const nftReceive = async () => {
        if (!nftSellId.trim()) {
          setShowNftCard(false);
          return;
        }

        const nftOfferInfo = await getNftOfferInfo({ id: nftSellId, net }).unwrap();
        if (!nftOfferInfo || isObjectEmpty(nftOfferInfo)) {
          return;
        }

        const nftInfo = await getNftInfo({ id: nftOfferInfo?.nftoken_id, net }).unwrap();
        if (!nftInfo || isObjectEmpty(nftInfo)) {
          return;
        }

        getNftMetaData(nftInfo?.uri)
          .unwrap()
          .then(() => setShowNftCard(true))
          .catch(() => setShowNftCard(false));
      };
      nftReceive();
    },
    300,
    [nftSellId],
  );

  // ========================================================================================
  // handlers
  // ========================================================================================

  const handleCloseResponse = () => {
    setNftSellId("");
    setShowNftCard(false);
    resetSubmitTxnResponse();
    handleClose();
  };

  const handleReset = () => {
    setNftSellId("");
    setShowNftCard(false);
    resetSubmitTxnResponse();
  };

  const handleReload = async () => {
    const nftOfferInfo = await getNftOfferInfo({ id: nftSellId, net }).unwrap();
    if (!nftOfferInfo || isObjectEmpty(nftOfferInfo)) {
      return;
    }

    const nftInfo = await getNftInfo({ id: nftOfferInfo?.nftoken_id, net }).unwrap();
    if (!nftInfo || isObjectEmpty(nftInfo)) {
      return;
    }

    getNftMetaData(nftInfo?.uri)
      .unwrap()
      .then(() => setShowNftCard(true))
      .catch(() => setShowNftCard(false));
  };

  if (view !== "default") {
    return (
      <>
        {view === "loading" && <MyrkleLoader />}

        {view === "error-1" && (
          <ResponseModal
            isError={true}
            message="Something went wrong"
            handleClose={handleCloseResponse}
          />
        )}

        {view === "xumm-qr-code" && (
          <XummTxnModal qrCodeImage={xummTxnQrCode} handleClose={handleCloseResponse} />
        )}

        {view === "error-2" && (
          <ResponseModal
            isError={true}
            message={submitTxnResponseMsg}
            handleClose={handleCloseResponse}
          />
        )}

        {view === "success" && <ResponseModal isError={false} handleClose={handleCloseResponse} />}
      </>
    );
  }

  return (
    // <AnimatePresence>
    //   {view === "default" && (
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
                name={nftMetaData?.name}
                image={nftMetaData?.image}
                handleReload={handleReload}
                handleReset={handleReset}
                isLoading={isNftMetaDataLoading}
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
            {isLoading && <Spinner size="sm" />}
          </HStack>

          <Input
            mb={4}
            value={nftSellId}
            onChange={(e: any) => setNftSellId(e.target.value)}
            // border={isNftMetaDataError ? "1px solid red" : "1px solid transparent"}
            // _hover={{ border: isNftMetaDataError ? "1px solid red" : "1px solid transparent" }}
          />

          <Button
            w="100%"
            h="40px"
            bg={isLoading || !nftSellId ? "secondary" : "primary"}
            color="#fff"
            isDisabled={isLoading || !nftSellId}
            // isDisabled={!nftMetaData || isNftMetaDataError}
            onClick={handleReceiveNft}
          >
            confirm
          </Button>
        </Box>
      </Box>
    </MotionBox>
    // )}

    //   {/* {view === "proceed" && (
    //     <ProceedModal
    //       text="Are you sure you want to proceed?"
    //       isLoading={isReceiveNftLoading}
    //       handleClose={handleClose}
    //       handleProceed={handleProceed}
    //     />
    //   )}
    // </AnimatePresence> */}
  );
}

export default AddNftModal;
