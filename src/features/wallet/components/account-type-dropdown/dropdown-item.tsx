import Button from "@/components/button";
import React from "react";

export interface DropdownItemProps {
  children: React.ReactNode;
  [anyProp: string]: any;
}

function DropdownItem({ children }: DropdownItemProps) {
  return (
    <Button
      zIndex="1"
      w="130px"
      h="27px"
      bg="darker"
      fontSize="2xs"
      borderRadius="30px"
      boxShadow="0 2px 2px #000"
      textAlign="left"
      justifyContent="space-between"
      _hover={{ bg: "dark" }}
    >
      {children}
    </Button>
  );
}

export default DropdownItem;
