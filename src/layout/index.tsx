import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import LogoIcon from "@/icons/logo";
import FooterLogoIcon from "@/icons/footer-logo";
import { Link } from "react-router-dom";
import ROUTES from "@/routes";

export interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <Box h="100vh" w="100vw" overflow="hidden">
      <Box h="100vh" bg="darkest" pos="relative">
        <Box
          h="100%"
          w={["100px", null, null, null, "250px"]}
          pos="absolute"
          top="0"
          left="0"
          pl="20px"
        >
          <Flex h="70px" justify="center" align="center">
            <Link to={ROUTES.HOME}>
              <LogoIcon fontSize="100px" display={["none", null, null, null, "none"]} />
            </Link>
          </Flex>
          <Box h="calc(100% - 50px - 50px)">
            <Sidebar />
          </Box>
          <Box h="50px">{/* bottom */}</Box>
        </Box>

        <Box
          h="100%"
          w={["calc(100% - 100px - 10px)", null, null, null, "calc(100% - 250px - 10px)"]}
          pos="absolute"
          top="0"
          right="0"
          pr={10}
        >
          <Box h="70px">
            <Navbar />
          </Box>
          <Box h="calc(100% - 50px - 50px)" pos="relative">
            {children}
          </Box>
          <Box h="30px">{/* bottom */}</Box>
        </Box>

        <HStack pos="absolute" bottom="-10px" right="20px">
          <Text color="#4C4C4C" fontWeight="bold" fontSize="sm">
            powered by
          </Text>
          <FooterLogoIcon fontSize="50px" />
        </HStack>
      </Box>
    </Box>
  );
}

export default Layout;
