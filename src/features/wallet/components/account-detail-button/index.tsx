import { HStack, Text } from "@chakra-ui/react";
import React from "react";

export interface AccountDetailButtonProps {
  text: string;
  icon: React.ElementType;
}

const AccountDetailButton = ({ text, icon: Icon }: AccountDetailButtonProps) => (
  <HStack borderRadius="17px" p="6px 17px" spacing="8px" bg="secondary" cursor="pointer">
    {Icon && <Icon fontSize="sm" stroke="textDark" fill="textDark" />}
    <Text color="textDark" fontSize="sm" fontWeight={600}>
      {text}
    </Text>
  </HStack>
);

export default AccountDetailButton;
