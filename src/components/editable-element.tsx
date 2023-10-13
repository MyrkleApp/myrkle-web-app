import { HStack, Input, Spinner, Square, Text, useDisclosure } from "@chakra-ui/react";
import EditIcon from "@/icons/edit";

export interface EditableElementProps {
  value?: string | number;
  inputValue?: string;
  handleInputChange?: (e: any) => void;
  isLoading?: boolean;
  handleSubmit?: () => void;
}

function EditableElement({
  value,
  inputValue,
  handleInputChange,
  isLoading,
  handleSubmit,
}: EditableElementProps) {
  const { isOpen, onToggle } = useDisclosure();

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
