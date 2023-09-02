import { HStack, Image, Text } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";

export interface TokenItemProps {
  name: string;
  handleClick: () => void;
}

function TokenItem({ name, handleClick }: TokenItemProps) {
  return (
    <HStack
      h="40px"
      borderRadius="7px"
      cursor="pointer"
      pl={3}
      mb={4}
      bg="secondary"
      onClick={handleClick}
    >
      <Image src={xrpLogo} alt="" h="30px" />
      <Text fontSize="sm" fontWeight="bold" textTransform="uppercase">
        {name}
      </Text>
    </HStack>
  );
}

export default TokenItem;
