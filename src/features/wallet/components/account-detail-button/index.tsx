import { HStack, Text } from "@chakra-ui/react";
import React from "react";

export interface AccountDetailButtonProps {
  text: string;
  icon: React.ElementType;
  handleClick?: () => void;
}

const AccountDetailButton = ({ text, icon: Icon, handleClick }: AccountDetailButtonProps) => (
  <HStack
    borderRadius="17px"
    p="7px 19px"
    spacing="8px"
    bg="secondary"
    cursor="pointer"
    onClick={handleClick}
  >
    {Icon && <Icon fontSize="sm" stroke="textDark" fill="textDark" />}
    <Text color="textDark" fontSize="xs" fontWeight={600}>
      {text}
    </Text>
  </HStack>
);

export default AccountDetailButton;
