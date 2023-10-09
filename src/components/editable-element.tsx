import { HStack, Input, Text, useDisclosure } from "@chakra-ui/react";
import EditIcon from "@/icons/edit";

export interface EditableElementProps {
  value?: string;
}

function EditableElement({ value }: EditableElementProps) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <HStack>
      <EditIcon onClick={onToggle} fontSize="12px" cursor="pointer" />
      {isOpen ? <Input h="25px" fontSize="xs" /> : <Text fontSize="xs">{String(value) || ""}</Text>}
    </HStack>
  );
}

export default EditableElement;
