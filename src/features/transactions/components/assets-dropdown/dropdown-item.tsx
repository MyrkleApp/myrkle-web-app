import { HStack, Image, Text } from "@chakra-ui/react";

export interface DropdownItemProps {
  name: string;
  icon: string;
  handleClick: () => void;
}

function DropdownItem({ name, icon, handleClick }: DropdownItemProps) {
  return (
    <HStack py={4} borderTop="1px solid #7c7c7c" onClick={handleClick}>
      <Image src={icon} alt="logo" h="25px" />
      <Text fontWeight="bold" fontSize="xs" textTransform="uppercase">
        {name}
      </Text>
    </HStack>
  );
}

export default DropdownItem;
