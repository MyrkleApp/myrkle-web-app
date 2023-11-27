import TokenIcon from "@/features/shared/components/token-icon";
import { HStack, Text } from "@chakra-ui/react";

export interface DropdownItemProps {
  token: string;
  issuer: string;
  handleClick: () => void;
}

function DropdownItem({ token, issuer, handleClick }: DropdownItemProps) {
  return (
    <HStack py={4} borderTop="1px solid #7c7c7c" onClick={handleClick}>
      <TokenIcon token={token} issuer={issuer} h="25px" />
      <Text fontWeight="bold" fontSize="xs" textTransform="uppercase">
        {token}
      </Text>
    </HStack>
  );
}

export default DropdownItem;
