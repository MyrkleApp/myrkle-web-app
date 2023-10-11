import {
  Box,
  Circle,
  CloseButton,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  Switch,
  Text,
  VStack,
  useOutsideClick,
} from "@chakra-ui/react";
import { useRef } from "react";
import xrpLogo from "@/assets/xrp-logo.svg";
import ItemLabel from "@/components/item-label";
import ArrowDownIcon from "@/icons/arrow-down";
import ArrowUpIcon from "@/icons/arrow-up";
import ChecksIcon from "@/icons/checks";
import ExchangeIcon from "@/icons/exchange";
import HourGlassIcon from "@/icons/hour-glass";
import CancelIcon from "@/icons/cancel";
import useGetXrpData from "../../hooks/use-get-xrp-data";
import RenderElement from "@/components/render-element";
import XrpEditables from "./xrp-editables";
import { isPositiveChange } from "@/helpers";

export interface TokenCardModalProps {
  data: ReturnType<typeof useGetXrpData>;
  handleClose: () => void;
}

// rchGBxcD1A1C2tdxF6papQYZ8kjRKMYcL
// BTC

function XrpModal({ data, handleClose }: TokenCardModalProps) {
  const { holders, tick, price } = data;
  // console.log(data);
  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: handleClose,
  });

  return (
    <Flex
      ref={ref}
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      h="100%"
      w="850px"
      p={10}
      bg="darker"
      borderRadius="25px"
      gap={3}
    >
      <Box w="50%" pos="relative">
        <HStack mb={2}>
          <HStack>
            <Image src={xrpLogo} alt="logo" />
            <VStack align="flex-start" spacing="0">
              <Text fontWeight="bold" fontSize="md" textTransform="uppercase">
                xrpl
              </Text>
              <Text fontSize="2xs" mt="-2px" color="danger">
                {`${isPositiveChange(data.percentageChange?.data) ? "+" : ""}${data.percentageChange
                  ?.data}%`}
              </Text>
            </VStack>
          </HStack>

          <Spacer />

          <VStack align="flex-end" spacing="0">
            <Text fontWeight="bold" fontSize="2xl" textTransform="uppercase">
              234.9
            </Text>
            <Text fontSize="sm" fontWeight="bold" mt="-2px" color="textDark">
              $575,234.9
            </Text>
          </VStack>
        </HStack>

        <HStack mb={4}>
          <Text fontSize="sm" fontWeight="bold">
            Ripple
          </Text>
          <Switch colorScheme="whatsapp" />
        </HStack>

        <ItemLabel title="Index" fontSize="sm" mb={0} />
        <Box
          w="100%"
          bg="dark"
          borderRadius="12px"
          px={4}
          py={3}
          mb={2}
          boxShadow="0 2px 8px #00000040"
        >
          <Text fontWeight="bold" fontSize="sm">
            sEdT1DxxEcgsR3FfcWrYGdHJHjKmBBT
          </Text>
        </Box>

        <ItemLabel title="Description" fontSize="sm" />
        <Box
          pos="absolute"
          bottom={0}
          bg="dark"
          h="calc(100% - 210px)"
          borderRadius="12px"
          p={4}
          boxShadow="0 2px 8px #00000040"
        >
          <Box h="95%" mt="-5px" overflow="hidden auto">
            <Text fontWeight="" fontSize="xs" maxW="calc(100% - 10px)">
              Lorem ipsum dolor sit amet consectetur. Risus neque pellentesque neque molestie
              pretium viverra. Libero vulputate lobortis pulvinar mauris vel sodales. Sed diam non
              dolor ut donec magna bibendum nascetur. Urna volutpat velit molestie placerat. Lorem
              ipsum dolor sit amet consectetur. Risus neque pellentesque neque molestie pretium
              viverr.
            </Text>
          </Box>
        </Box>
      </Box>

      <Box w="50%" pos="relative">
        <CloseButton pos="absolute" top="-30px" right="-30px" onClick={handleClose} />

        <Flex justify="space-between">
          <Circle bg="secondary" size="50px">
            <ChecksIcon stroke="textDark" fontSize="lg" />
          </Circle>
          <Circle bg="secondary" size="50px">
            <HourGlassIcon color="textDark" fill="textDark" fontSize="lg" />
          </Circle>
          <Circle bg="secondary" size="50px">
            <ArrowUpIcon stroke="textDark" fontSize="lg" />
          </Circle>
          <Circle bg="secondary" size="50px">
            <ArrowDownIcon stroke="textDark" fontSize="lg" />
          </Circle>
          <Circle bg="secondary" size="50px">
            <ExchangeIcon stroke="textDark" fill="none" fontSize="lg" />
          </Circle>
        </Flex>

        <SimpleGrid columns={4} h="100px" spacing={3} mb={2} w="100%" pos="absolute" top="110px">
          <VStack bg="dark" borderRadius="12px" pt={6} spacing={5} boxShadow="0 2px 8px #00000040">
            <Text fontSize="md">{tick}</Text>
            <Text fontSize="2xs">Tick</Text>
          </VStack>
          <RenderElement isLoading={price.isLoading} w="auto" h="auto">
            <VStack
              bg="dark"
              borderRadius="12px"
              pt={6}
              spacing={5}
              boxShadow="0 2px 8px #00000040"
            >
              <Text fontSize="md">{price.data}</Text>
              <Text fontSize="2xs">Price</Text>
            </VStack>
          </RenderElement>
          <RenderElement isLoading={holders.isLoading} w="auto" h="auto">
            <VStack
              bg="dark"
              borderRadius="12px"
              pt={6}
              spacing={5}
              boxShadow="0 2px 8px #00000040"
            >
              <Text fontSize="md">{holders.data}</Text>
              <Text fontSize="2xs">Holders</Text>
            </VStack>
          </RenderElement>

          <VStack
            bg="dark"
            borderRadius="12px"
            pt={6}
            spacing={3}
            boxShadow="0 2px 8px #00000040"
            cursor="pointer"
            _hover={{ bg: "danger" }}
          >
            <CancelIcon fontSize="3xl" mb={1} />
            <Text fontSize="2xs">Remove</Text>
          </VStack>
        </SimpleGrid>

        <Box
          pos="absolute"
          bottom={0}
          bg="dark"
          w="100%"
          h="calc(100% - 230px)"
          borderRadius="12px"
          boxShadow="0 2px 8px #00000040"
        >
          <Box
            bg="#5757573B"
            h="calc(100% - 14px)"
            w="58%"
            borderRadius="12px"
            pos="absolute"
            top="7px"
            right="7px"
            zIndex={-1}
          />
          <XrpEditables data={data} />
        </Box>
      </Box>
    </Flex>
  );
}

export default XrpModal;
