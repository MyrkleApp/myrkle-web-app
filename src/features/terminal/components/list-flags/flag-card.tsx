import Backdrop from "@/components/backdrop";
import MyrkleLoader from "@/components/myrkle-loader";
import ResponseModal from "@/components/response-modal";
import XummTxnModal from "@/components/xumm-txn-modal";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import { TTxnPipeline } from "@/features/shared/types";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";
import { Box, HStack, Spacer, Switch, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export interface FlagCardProps {
  title?: string;
  description?: string;
  currentValue?: boolean;
  mutation?: (value: any) => any;
}

function FlagCard({ title, description, currentValue, mutation }: FlagCardProps) {
  const address = useSelector(selectAddress);

  const [switchValue, setSwitchValue] = useState(false);
  const [view, setView] = useState<TTxnPipeline>("default");

  const [{ isSubmitTxnSuccess, xummTxnQrCode }, { handleSubmitTxn }] = useSubmitTxn("flag");

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

  useEffect(() => {
    setSwitchValue(!!currentValue);
  }, [currentValue]);

  const handleToggleSwitch = () => {
    setSwitchValue(!switchValue);

    if (!mutation) return;

    setTimeout(() => {
      setView("loading");

      mutation({ sender_addr: address, state: !switchValue })
        .unwrap()
        .then((res: any) => {
          const successCallback = () => setView("success");
          const errorCallback = () => setView("error-2");
          handleSubmitTxn(res, successCallback, errorCallback);
        })
        .catch(() => setView("error-1"));
    }, 200);
  };

  const handleClose = () => {
    setView("default");
  };

  return (
    <>
      <Box bg="dark" borderRadius="30px" p="30px" w="100%" h="100%" aspectRatio={1 / 0.8}>
        <HStack mb="40px">
          <Text fontWeight="bold" fontSize="sm" maxW="80%" textOverflow="break-work">
            {title || "Flags name"}
          </Text>
          <Spacer />
          <Switch colorScheme="whatsapp" isChecked={switchValue} onChange={handleToggleSwitch} />
        </HStack>

        <Text fontSize="sm">
          {description || "This account is an automated market maker instance."}
        </Text>
      </Box>

      <Backdrop isOpen={view !== "default"}>
        {view === "loading" && <MyrkleLoader />}

        {view === "error-1" && <ResponseModal isError={true} handleClose={handleClose} />}

        {view === "xumm-qr-code" && (
          <XummTxnModal qrCodeImage={xummTxnQrCode} handleClose={handleClose} />
        )}

        {view === "error-2" && <ResponseModal isError={true} handleClose={handleClose} />}

        {view === "success" && <ResponseModal isError={false} handleClose={handleClose} />}
      </Backdrop>
    </>
  );
}

export default FlagCard;
