import { HStack, Input, Square, Text, useDisclosure } from "@chakra-ui/react";
import EditIcon from "@/icons/edit";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import { useEffect, useState } from "react";
import { TTxnPipeline } from "@/features/shared/types";
import Backdrop from "./backdrop";
import MyrkleLoader from "./myrkle-loader";
import ResponseModal from "./response-modal";
import XummTxnModal from "./xumm-txn-modal";
import CorrectIcon from "@/icons/correct";
import CancelIcon from "@/icons/cancel";

export interface EditableElementProps {
  value?: string | number;
  inputValue?: string;
  handleInputChange?: (e: any) => void;
  isLoading?: boolean;
  payload?: any;
  mutation?: (payload: any) => any;
}

function EditableElement({
  value,
  inputValue,
  handleInputChange,
  payload,
  mutation,
}: EditableElementProps) {
  const { isOpen, onToggle } = useDisclosure();

  const [{ isSubmitTxnSuccess, xummTxnQrCode }, { handleSubmitTxn, resetSubmitTxnResponse }] =
    useSubmitTxn("account-info");

  const [view, setView] = useState<TTxnPipeline>("default");

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

  const handleSubmit = () => {
    if (!mutation) return;

    setView("loading");

    mutation(payload)
      .unwrap()
      .then((res: any) => {
        handleSubmitTxn(res);
      })
      .catch(() => setView("error-1"));
  };

  const handleReset = () => {
    resetSubmitTxnResponse();
    onToggle();
  };

  return (
    <>
      <HStack>
        <EditIcon onClick={onToggle} fontSize="12px" cursor="pointer" />
        {isOpen ? (
          <HStack>
            <Input
              value={inputValue}
              onChange={handleInputChange}
              h="20px"
              w="50%"
              borderRadius="0"
              fontSize="xs"
              p={1}
              bg="#fff"
              color="#000"
            />
            <Square size="20px" bg="danger" cursor="pointer" onClick={onToggle}>
              <CancelIcon fontSize="8px" />
            </Square>
            <Square size="20px" bg="success" cursor="pointer" onClick={handleSubmit}>
              <CorrectIcon strokeWidth="2px" />
            </Square>
          </HStack>
        ) : (
          <Text fontSize="xs">{String(value) || ""}</Text>
        )}
      </HStack>

      <Backdrop isOpen={view !== "default"}>
        {view === "loading" && <MyrkleLoader />}
        {view === "error-1" && <ResponseModal isError={true} handleClose={handleReset} />}
        {view === "xumm-qr-code" && <XummTxnModal qrCodeImage={xummTxnQrCode} />}
        {view === "error-2" && <ResponseModal isError={true} handleClose={handleReset} />}
        {view === "success" && <ResponseModal isError={false} handleClose={handleReset} />}
      </Backdrop>
    </>
  );
}

export default EditableElement;
