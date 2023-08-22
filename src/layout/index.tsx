import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import LogoIcon from "@/icons/logo";
import FooterLogoIcon from "@/icons/footer-logo";

export interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <Box h="100vh" overflow="hidden" bg="darkest" pos="relative">
      <Box h="100%" w="270px" pos="absolute" top="0" left="0" pl="20px">
        <Flex h="70px" justify="center" align="center">
          <LogoIcon fontSize="100px" />
        </Flex>
        <Box h="calc(100% - 70px - 50px)">
          <Sidebar />
        </Box>
        <Box h="50px">{/* bottom */}</Box>
      </Box>

      <Box h="100%" w="calc(100% - 270px - 10px)" pos="absolute" top="0" right="0" pr={10}>
        <Box h="70px">
          <Navbar />
        </Box>
        <Box h="calc(100% - 70px - 50px)" pos="relative">
          {children}
        </Box>
        <Box h="50px">{/* bottom */}</Box>
      </Box>

      <HStack pos="absolute" bottom="-25px" right="20px">
        <Text color="#4C4C4C" fontWeight="bold" fontSize="sm">
          powered by
        </Text>
        <FooterLogoIcon fontSize="100px" />
      </HStack>
    </Box>
  );
}

export default Layout;
