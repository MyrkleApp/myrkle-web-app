import LogoIcon from "@/icons/logo";
import ROUTES from "@/routes";
import { Flex, HStack, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import WalletButton from "./wallet-button";

const links = [
  { name: "home", path: ROUTES.HOME },
  { name: "about us", path: ROUTES.ABOUT_US },
  { name: "contact", path: ROUTES.CONTACT },
];

function HomeNavbar() {
  const { pathname } = useLocation();

  const getNavItemColor = (route: string) => {
    return pathname === route ? "primary" : "#fff";
  };

  return (
    <Flex align="center" justify="space-between" h="60px" w="100%" pos="absolute" bg="#FFFFFF03">
      <LogoIcon fontSize="80px" ml="50px" />
      <HStack spacing={10} mr="50px">
        {links.map((link, i) => (
          <Link key={i} to={link.path}>
            <Text
              fontSize="xs"
              fontWeight="bold"
              textTransform="uppercase"
              color={getNavItemColor(link.path)}
              _hover={{ color: "primary" }}
            >
              {link.name}
            </Text>
          </Link>
        ))}
        <WalletButton />
      </HStack>
    </Flex>
  );
}

export default HomeNavbar;
