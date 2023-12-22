import LogoIcon from "@/icons/logo";
import ROUTES from "@/routes";
import { Flex, HStack, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import WalletButton from "./wallet-button";

const links = [
  { name: "home", path: `${ROUTES.LANDING}?section=home` },
  { name: "about", path: `${ROUTES.LANDING}?section=about` },
  { name: "contact", path: ROUTES.CONTACT },
];

function HomeNavbar() {
  const { pathname } = useLocation();

  const getNavItemColor = (route: string) => {
    return pathname === route ? "primary" : "#fff";
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      h="60px"
      w="100%"
      pos="absolute"
      bg="#FFFFFF03"
      zIndex={1000}
    >
      <LogoIcon fontSize="80px" ml="50px" />
      <HStack spacing={10} mr="50px">
        {links.slice(0, 2).map((link, i) => (
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
        <a href="https://twitter.com/MyrkleApp" target="_blank">
          <Text
            fontSize="xs"
            fontWeight="bold"
            textTransform="uppercase"
            color={getNavItemColor(links[2].path)}
            _hover={{ color: "primary" }}
          >
            {links[2].name}
          </Text>
        </a>
        <WalletButton />
      </HStack>
    </Flex>
  );
}

export default HomeNavbar;
