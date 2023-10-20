import { Box, Text } from "@chakra-ui/react";

export interface AddressItemProps {
  name: string;
  address: string;
  isActive: boolean;
  handleClick: () => void;
}

function AddressItem({ name, address, isActive, handleClick }: AddressItemProps) {
  return (
    <Box
      px={3}
      py={1}
      mb={3}
      borderRadius="7px"
      bg={isActive ? "primary" : "#3D3D3D"}
      cursor="pointer"
      onClick={handleClick}
    >
      <Text
        color={isActive ? "#000" : "#FFFFFF"}
        fontSize="xs"
        fontWeight="bold"
        textTransform="uppercase"
      >
        {name}
      </Text>
      <Text color={isActive ? "#000" : "#FFFFFF"} fontSize="xs">
        {address}
      </Text>
    </Box>
  );
}

export default AddressItem;
