import LogoIcon from "@/icons/logo";
import ROUTES from "@/routes";
import { Flex, HStack, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { name: "home", path: ROUTES.HOME },
  { name: "about us", path: ROUTES.ABOUT_US },
  { name: "faq", path: ROUTES.FAQ },
  { name: "contact", path: ROUTES.CONTACT },
];

function Footer() {
  const { pathname } = useLocation();

  const getNavItemColor = (route: string) => {
    return pathname === route ? "#000" : "#fff";
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      h="60px"
      w="90%"
      ml="5%"
      pos="absolute"
      bottom="20px"
      zIndex={1000}
    >
      <LogoIcon fontSize="100px" ml="50px" />
      <HStack spacing={10} mr="50px">
        {links.map((link, i) => (
          <Link key={i} to={link.path}>
            <Text
              fontSize="xs"
              fontWeight="bold"
              textTransform="uppercase"
              color={getNavItemColor(link.path)}
              _hover={{ color: "#000" }}
            >
              {link.name}
            </Text>
          </Link>
        ))}
      </HStack>
    </Flex>
  );
}

export default Footer;
