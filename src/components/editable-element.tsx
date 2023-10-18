import { HStack, Input, Spinner, Square, Text, useDisclosure } from "@chakra-ui/react";
import EditIcon from "@/icons/edit";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";

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
  isLoading,
  payload,
  mutation,
}: EditableElementProps) {
  const { isOpen, onToggle } = useDisclosure();

  const handleSubmitTxn = useSubmitTxn();

  const handleSubmit = () => {
    if (!mutation) return;

    mutation(payload)
      .unwrap()
      .then((res: any) => {
        console.log(res);
        handleSubmitTxn(res);
      })
      .catch((err: any) => console.log(err));
  };

  return (
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
          {isLoading ? (
            <Spinner size="sm" />
          ) : (
            <>
              <Square size="20px" bg="success" cursor="pointer" onClick={handleSubmit} />
              <Square size="20px" bg="danger" cursor="pointer" />
            </>
          )}
        </HStack>
      ) : (
        <Text fontSize="xs">{String(value) || ""}</Text>
      )}
    </HStack>
  );
}

export default EditableElement;
