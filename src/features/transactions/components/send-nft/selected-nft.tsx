import Button from "@/components/button";
import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { MotionImage } from "@/components/motion-elements";
import { nftFormatter } from "@/helpers";
import Backdrop from "@/components/backdrop";
import SelectNftModal from "./select-nft-modal";
import TextArea from "@/components/text-area";
import { useEffect, useState } from "react";
import { useSendNftMutation } from "@/features/shared/redux/xrp.api";
import { TTxnPipeline } from "@/features/shared/types";
import { useSelector } from "react-redux";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";
import MyrkleLoader from "@/components/myrkle-loader";
import ResponseModal from "@/components/response-modal";
import ListSellOffersModal from "./list-sell-offers-modal";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import XummTxnModal from "@/components/xumm-txn-modal";

export interface SelectedNftProps {
  nft: any;
  handleNftItemClick: (value: any) => void;
}

// r4W82KKuXBbFTKJrJDiTkfaAnzz3SdBms9

function SelectedNft({ nft, handleNftItemClick }: SelectedNftProps) {
  const [{ isSubmitTxnSuccess, xummTxnQrCode }, { handleSubmitTxn, resetSubmitTxnResponse }] =
    useSubmitTxn("nft");

  const address = useSelector(selectAddress);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // ============================================================================================
  // state
  // ============================================================================================

  const [receiverAddress, setReceiverAddress] = useState("");
  const [view, setView] = useState<TTxnPipeline>("default");

  // ============================================================================================
  // api
  // ============================================================================================

  const [sendNft] = useSendNftMutation();

  // ============================================================================================
  // effects
  // ============================================================================================

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

  // ============================================================================================
  // handlers
  // ============================================================================================

  const handleSelectNft = (data: any) => {
    handleNftItemClick(data);
    onClose();
  };

  const handleConfirm = () => {
    setView("loading");

    sendNft({
      sender_addr: address,
      nftoken_id: nft?.id,
      receiver_addr: receiverAddress,
    })
      .then((res: any) => {
        handleSubmitTxn(res?.data);
      })
      .catch(() => setView("error-1"));
  };

  const handleReset = () => {
    resetSubmitTxnResponse();
    setView("default");
    handleNftItemClick(null);
    setReceiverAddress("");
    onClose();
  };

  return (
    <>
      <Flex
        pos="absolute"
        top="80px"
        ml="50%"
        transform="translateX(-50%)"
        w="calc(100% - 40px)"
        h="calc(100% - 170px)"
        maxH="350px"
        gap={2}
      >
        <Box bg="secondary" w="50%" borderRadius="20px" p={2} onClick={onOpen}>
          <MotionImage
            src={nftFormatter(nft?.image)}
            alt=""
            w="100%"
            maxH="70%"
            aspectRatio={1}
            mb={3}
            borderRadius="20px"
            initial={{ x: 100, y: -100 }}
            animate={{ x: 0, y: 0, transition: { duration: 0.3, type: "spring", stiffness: 70 } }}
          />
          <Text fontSize="sm" mb={1} pl={2} fontWeight="bold">
            Name
          </Text>
          <Text fontSize="sm" pl={2}>
            {nft?.name}
          </Text>
        </Box>

        <Flex direction="column" w="50%" justify="space-between" gap={2}>
          <Flex p={3} direction="column" bg="secondary" h="35%" borderRadius="10px">
            <Text fontSize="xs" fontWeight="bold" mb={4}>
              Address
            </Text>
            <Box h="calc(100% - 40px)">
              <TextArea
                mb={5}
                fontSize="xs"
                letterSpacing={2}
                h="100%"
                p={1}
                color="#fff"
                value={receiverAddress}
                onChange={(e: any) => setReceiverAddress(e.target.value)}
              />
            </Box>
          </Flex>
          <Flex
            px={3}
            py={3}
            direction="column"
            // justify="space-between"
            bg="secondary"
            h="65%"
            borderRadius="10px"
          >
            <Text fontSize="xs" fontWeight="bold">
              Note
            </Text>
            <Text fontSize="2xs" color="danger">
              On click of the confirm button, an NFT sell ID will be displayed.
            </Text>
            <Text fontSize="2xs" color="danger">
              The receiver of the NFT should lorem ipsum their life away till they get it
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Button
        bg={receiverAddress ? "primary" : "secondary"}
        pos="absolute"
        bottom="0"
        ml="50%"
        transform="translateX(-50%)"
        letterSpacing={1}
        w="calc(100% - 40px)"
        isDisabled={!receiverAddress}
        onClick={handleConfirm}
      >
        confirm
      </Button>

      <Backdrop isOpen={isOpen}>
        <SelectNftModal handleClose={onClose} handleNftItemClick={handleSelectNft} />
      </Backdrop>

      <Backdrop isOpen={view !== "default"}>
        {view === "loading" && <MyrkleLoader />}
        {view === "error-1" && <ResponseModal isError={true} handleClose={handleReset} />}
        {view === "xumm-qr-code" && (
          <XummTxnModal qrCodeImage={xummTxnQrCode} handleClose={handleReset} />
        )}
        {view === "error-2" && <ResponseModal isError={true} handleClose={handleReset} />}
        {view === "success" && (
          <ListSellOffersModal
            id={nft?.id}
            receiverAddress={receiverAddress}
            handleClose={handleReset}
          />
        )}
      </Backdrop>
    </>
  );
}

export default SelectedNft;
