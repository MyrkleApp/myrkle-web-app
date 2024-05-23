import { HStack, Text } from "@chakra-ui/react";
import React from "react";

export interface AccountDetailButtonProps {
  text: string;
  icon: React.ElementType;
  handleClick?: () => void;
}

const AccountDetailButton = ({ text, icon: Icon, handleClick }: AccountDetailButtonProps) => (
  <HStack
    borderRadius={["50px", null, null, null, "25px"]}
    h={["35px", null, null, null, "auto"]}
    w={["35px", null, null, null, "auto"]}
    p={["0", null, null, null, "7px 19px"]}
    spacing="8px"
    bg="secondary"
    cursor="pointer"
    onClick={handleClick}
  >
    {Icon && (
      <Icon
        fontSize={["xs", null, null, null, "sm"]}
        ml={["12px", null, null, null, "0"]}
        stroke="textDark"
        fill="textDark"
      />
    )}
    <Text
      display={["none", null, null, null, "block"]}
      color="textDark"
      fontSize={["xs", null, null, null, "sm"]}
      fontWeight={600}
    >
      {text}
    </Text>
  </HStack>
);

export default AccountDetailButton;
