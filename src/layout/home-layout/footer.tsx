import LogoIcon from "@/icons/logo";
import ROUTES from "@/routes";
import { Flex, HStack, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const links = [
  { name: "home", path: `#home` },
  { name: "about", path: `#about` },
  { name: "twitter", path: ROUTES.CONTACT },
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
        {links.slice(0, 2).map((link, i) => (
          <a key={i} href={link.path}>
            <Text
              fontSize="xs"
              fontWeight="bold"
              textTransform="uppercase"
              color={getNavItemColor(link.path)}
              _hover={{ color: "#000" }}
            >
              {link.name}
            </Text>
          </a>
        ))}
        <a href="https://twitter.com/MyrkleApp" target="_blank">
          <Text
            fontSize="xs"
            fontWeight="bold"
            textTransform="uppercase"
            color={getNavItemColor(links[2].path)}
            _hover={{ color: "#000" }}
          >
            {links[2].name}
          </Text>
        </a>
      </HStack>
    </Flex>
  );
}

export default Footer;
