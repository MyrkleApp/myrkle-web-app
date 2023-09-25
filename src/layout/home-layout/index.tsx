import { Box, Flex, Image } from "@chakra-ui/react";
import home1 from "@/assets/home-1.png";
import HomeNavbar from "./navbar";

export interface HomeLayoutProps {
  children: React.ReactNode;
}

function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <Flex h="100vh" bg="darker">
      <Box w="50%" h="100%">
        <Image src={home1} alt="" w="90%" h="100%" objectFit="cover" />
      </Box>
      <Box w="50%" h="100%" pos="relative">
        {children}
      </Box>

      <HomeNavbar />
    </Flex>
  );
}

export default HomeLayout;
