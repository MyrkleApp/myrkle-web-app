import { Flex, HStack, IconButton, Image, Text, VStack, useDisclosure } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import ChecksIcon from "@/icons/checks";
import HourGlassIcon from "@/icons/hour-glass";
import ArrowUpIcon from "@/icons/arrow-up";
import ArrowDownIcon from "@/icons/arrow-down";
import ExchangeIcon from "@/icons/exchange";
import Backdrop from "@/components/backdrop";
import TokenCardModal from "./token-card-modal";

function TokenCard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        // minH="75px"
        w="calc(100% - 15px)"
        h="calc(100% / 3.25)"
        flexShrink={0}
        bg="dark"
        borderRadius="4vh"
        px="2.5%"
        cursor="pointer"
        onClick={onOpen}
      >
        <Flex justify="space-between" align="center" w="67%" h="100%" pr="20px">
          <HStack h="100%">
            <Image src={xrpLogo} alt="" h="60%" />
            <Text
              className="font-face-proxima-nova-extrabld"
              fontSize="2.5vh"
              textTransform="uppercase"
            >
              usd
            </Text>
          </HStack>

          <Text fontSize="xs">WRUEI23...093T0G38</Text>

          <Text fontSize="xs" fontWeight="bold" color="success">
            +0.02%
          </Text>

          <VStack spacing={0} align="flex-end">
            <Text
              className="font-face-proxima-nova-extrabld"
              fontSize="sm"
              fontWeight="bold"
              textTransform="uppercase"
              mr={1}
            >
              234.9
            </Text>
            <Text color="textDark" fontSize="2xs" fontWeight="bold">
              $600,043.89
            </Text>
          </VStack>
        </Flex>

        <HStack justify="space-between" borderLeft="1px solid #353535" pl="20px" w="33%" h="55%">
          <IconButton
            bg="secondary"
            h="100%"
            aspectRatio={1}
            borderRadius="50%"
            flexShrink={0}
            aria-label={""}
            _hover={{ bg: "secondary " }}
          >
            <ChecksIcon stroke="textDark" fontSize="2.8vh" />
          </IconButton>
          <IconButton
            bg="secondary"
            h="100%"
            aspectRatio={1}
            borderRadius="50%"
            flexShrink={0}
            aria-label={""}
            _hover={{ bg: "secondary " }}
          >
            <HourGlassIcon stroke="textDark" fill="textDark" fontSize="2.8vh" />
          </IconButton>
          <IconButton
            bg="secondary"
            h="100%"
            aspectRatio={1}
            borderRadius="50%"
            flexShrink={0}
            aria-label={""}
            _hover={{ bg: "secondary " }}
          >
            <ArrowUpIcon stroke="textDark" fontSize="2.8vh" />
          </IconButton>
          <IconButton
            bg="secondary"
            h="100%"
            aspectRatio={1}
            borderRadius="50%"
            flexShrink={0}
            aria-label={""}
            _hover={{ bg: "secondary " }}
          >
            <ArrowDownIcon stroke="textDark" fontSize="2.8vh" />
          </IconButton>
          <IconButton
            bg="secondary"
            h="100%"
            aspectRatio={1}
            borderRadius="50%"
            flexShrink={0}
            aria-label={""}
            _hover={{ bg: "secondary " }}
          >
            <ExchangeIcon stroke="textDark" fill="none" fontSize="2.8vh" />
          </IconButton>
        </HStack>
      </Flex>

      <Backdrop isOpen={isOpen}>
        <TokenCardModal handleClose={handleClose} />
      </Backdrop>
    </>
  );
}

export default TokenCard;
