import React from "react";
import { HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export interface NavItemProps {
  title: string;
  icon: React.ElementType;
  link: string;
  isActive?: boolean;
}

function NavItem({ title, icon: NavItemIcon, link, isActive }: NavItemProps) {
  return (
    <Link to={link} style={{ width: "100%" }}>
      <HStack
        w="100%"
        aspectRatio={[1, null, null, null, "auto"]}
        spacing="10px"
        pl={[3, null, null, null, 5]}
        py="7px"
        mb={3}
        bg={isActive ? "rgba(0, 223, 22, 0.27)" : "none"}
        border={`1px solid ${isActive ? "#00DF16" : "transparent"}`}
        fontSize="sm"
        fontWeight="bold"
        borderRadius="20px"
      >
        <NavItemIcon stroke="#fff" fill="none" />
        <Text fontSize="xs" display={["none", null, null, null, "block"]}>
          {title}
        </Text>
      </HStack>
    </Link>
  );
}

export default NavItem;
