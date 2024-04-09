import {
  Box,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  Square,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import IconContainer from "../icon-container";
import ArrowDownIcon from "@/icons/arrow-down";
import { MotionBox } from "@/components/motion-elements";
import { AnimatePresence } from "framer-motion";

const dappsList = [
  {
    name: "Dhali",
    image: "https://dhali.io/images/illustrations/dhali-logo.png",
    description: "Dhali is a Web3 API gateway provider, enabling seamless API monetization.",
    link: "https://dhali.io/",
  },
  {
    name: "Anodos Finance",
    image: "https://apps.anodos.finance/assets/images/logo/anados-dark-full.svg",
    description:
      "The Utility Layer of Web3 - Powered by the #XRPL. #BuiltOnXRPL Empowering Universal Access to Blockchain Technology.",
    link: "https://apps.anodos.finance/",
  },
];

function Dapps() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box px={10} mt={10}>
      <HStack
        py={1}
        pl={4}
        pr={2}
        borderRadius="12px"
        mb={5}
        bg="#242424"
        cursor="pointer"
        onClick={onToggle}
      >
        <Text fontWeight="bold" color={isOpen ? "success" : "textDark"} fontSize="sm">
          XRPL DAPPS
        </Text>
        <Spacer />
        <Square
          bg={isOpen ? "success" : "secondary"}
          borderRadius="8px"
          p={1}
          sx={{ "*": { color: "#ffffff" } }}
        >
          <ArrowDownIcon fontSize="mg" transform={`rotate(${isOpen ? "180" : "0"}deg)`} />
        </Square>
      </HStack>

      <AnimatePresence>
        {isOpen && (
          <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SimpleGrid columns={[2, 4, 6, 8]} spacing={8}>
              {dappsList.map((dappItem, i) => (
                <a href={dappItem.link} target="_blank" key={i}>
                  <IconContainer title={dappItem.name} aspectRatio={1}>
                    <Image src={dappItem.image} alt="" h="50%" />
                  </IconContainer>
                </a>
              ))}
            </SimpleGrid>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default Dapps;
