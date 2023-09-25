import { HStack, Input, Text, useDisclosure } from "@chakra-ui/react";
import EditIcon from "@/icons/edit";

function EditableElement() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <HStack>
      <EditIcon onClick={onToggle} fontSize="12px" cursor="pointer" />
      {isOpen ? (
        <Input h="25px" fontSize="xs" />
      ) : (
        <Text fontSize="xs" color="textDark">
          default text
        </Text>
      )}
    </HStack>
  );
}

export default EditableElement;
