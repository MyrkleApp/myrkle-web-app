import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import IconContainer from "../icon-container";
import NftIcon from "@/icons/nft";
import Backdrop from "@/components/backdrop";
import { AnimatePresence } from "framer-motion";
import BurnListModal from "./burn-list-modal";
import BurnItemModal from "./burn-item-modal";
import ProceedModal from "@/features/shared/components/proceed-modal";
import { useBurnNftMutation } from "@/features/shared/redux/xrp.api";
import { useSelector } from "react-redux";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import MyrkleLoader from "@/components/myrkle-loader";
import ResponseModal from "@/components/response-modal";
import XummTxnModal from "@/components/xumm-txn-modal";

function BurnNft() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const address = useSelector(selectAddress);

  const [modalType, setModalType] = useState<
    "list" | "item" | "proceed" | "loading" | "error-1" | "xumm-qr-code" | "error-2" | "success"
  >("list");
  const [selectedNft, setSelectedNft] = useState<any>(null);

  const [burnNft, { isLoading }] = useBurnNftMutation();

  const [{ isSubmitTxnSuccess, xummTxnQrCode }, { handleSubmitTxn, resetSubmitTxnResponse }] =
    useSubmitTxn();

  useEffect(() => {
    if (xummTxnQrCode) {
      setModalType("xumm-qr-code");
    }
  }, [xummTxnQrCode]);

  useEffect(() => {
    if (isSubmitTxnSuccess === null) return;

    if (isSubmitTxnSuccess) {
      setModalType("success");
    } else setModalType("error-2");
  }, [isSubmitTxnSuccess]);

  const handleClose = () => {
    onClose();
    setModalType("list");
    resetSubmitTxnResponse();
  };

  const handleItemClick = (nft: any) => {
    setModalType("item");
    setSelectedNft(nft);
  };

  const handleBurnItemModalClose = () => {
    onClose();
    setModalType("list");
  };

  const handleConfirmBurnClick = () => {
    setModalType("proceed");
  };

  const handleProceed = () => {
    setModalType("loading");

    burnNft({
      sender_addr: address,
      nftoken_id: selectedNft?.id,
      holder: address,
    })
      .unwrap()
      .then((res) => {
        handleSubmitTxn(res);
      })
      .catch(() => setModalType("error-1"));
  };

  return (
    <>
      <IconContainer title="NFT" h="210px" handleClick={onOpen}>
        <NftIcon fill="none" fontSize="50px" />
      </IconContainer>

      <Backdrop isOpen={isOpen}>
        <AnimatePresence>
          {modalType === "list" && (
            <BurnListModal handleClose={handleClose} handleItemClick={handleItemClick} />
          )}

          {modalType === "item" && (
            <BurnItemModal
              selectedNft={selectedNft}
              handleClose={handleBurnItemModalClose}
              handleConfirmBurnClick={handleConfirmBurnClick}
            />
          )}

          {modalType === "proceed" && (
            <ProceedModal
              text="You are about to burn this NFT from your wallet"
              isLoading={isLoading}
              handleClose={handleClose}
              handleProceed={handleProceed}
            />
          )}

          {modalType === "loading" && <MyrkleLoader />}

          {modalType === "error-1" && <ResponseModal isError={true} handleClose={handleClose} />}

          {modalType === "xumm-qr-code" && <XummTxnModal qrCodeImage={xummTxnQrCode} />}

          {modalType === "error-2" && <ResponseModal isError={true} handleClose={handleClose} />}

          {modalType === "success" && <ResponseModal isError={false} handleClose={handleClose} />}
        </AnimatePresence>
      </Backdrop>
    </>
  );
}

export default BurnNft;
