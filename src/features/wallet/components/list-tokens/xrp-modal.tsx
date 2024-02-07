import {
  Box,
  Circle,
  CloseButton,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
  useOutsideClick,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
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
import { formatNumber, isPositiveChange } from "@/helpers";
import { useGetBalanceQuery } from "@/features/shared/redux/xrp.api";
import { useSelector } from "react-redux";
import { selectAddress, selectNet } from "../../redux/wallet.selectors";
import { xrpToken } from "@/constants";
import AddressModal from "../wallet-details/address-modal";
import { Link } from "react-router-dom";
import ROUTES from "@/routes";

export interface TokenCardModalProps {
  data: ReturnType<typeof useGetXrpData>;
  handleClose: () => void;
}

// rchGBxcD1A1C2tdxF6papQYZ8kjRKMYcL
// BTC

function XrpModal({ data, handleClose }: TokenCardModalProps) {
  const { holders, tick, price } = data;

  const address = useSelector(selectAddress);
  const net = useSelector(selectNet);

  const { data: balanceData } = useGetBalanceQuery({ address, net });

  const [isAddressModal, setIsAddressModal] = useState(false);

  const xrpBalanceToUSD = data?.price.data * balanceData?.balance;

  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: () => {
      if (!isAddressModal) {
        handleClose();
      }
    },
  });

  const tokenIconLink = (url: string) => {
    return `${url}?token=${xrpToken.token}&issuer=${xrpToken.issuer}`;
  };

  if (isAddressModal) {
    return (
      <AddressModal
        handleClose={handleClose}
        address={address}
        handleXAddress={() => {
          /** */
        }}
        hideXAddressButton
      />
    );
  }

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
                xrp
              </Text>
              <Text
                fontSize="2xs"
                mt="-2px"
                color={isPositiveChange(data.percentageChange?.data) ? "success" : "danger"}
              >
                {`${isPositiveChange(data.percentageChange?.data) ? "+" : ""}${data.percentageChange
                  ?.data}%`}
              </Text>
            </VStack>
          </HStack>

          <Spacer />

          <VStack align="flex-end" spacing="0">
            <Text fontWeight="bold" fontSize="2xl" textTransform="uppercase">
              {formatNumber(balanceData?.balance)}
            </Text>
            <Text fontSize="sm" fontWeight="bold" mt="-2px" color="textDark">
              ${formatNumber(xrpBalanceToUSD)}
            </Text>
          </VStack>
        </HStack>

        {/* <HStack mb={4}>
          <Text fontSize="sm" fontWeight="bold">
            Ripple
          </Text>
          <Switch colorScheme="whatsapp" />
        </HStack> */}

        {/* <ItemLabel title="Index" fontSize="sm" mb={0} />
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
        </Box> */}

        <ItemLabel title="Description" fontSize="sm" mt={4} />
        <Box
          pos="absolute"
          bottom={0}
          bg="dark"
          h="calc(100% - 111px)"
          borderRadius="12px"
          p={4}
          boxShadow="0 2px 8px #00000040"
        >
          <Box h="95%" mt="-5px" overflow="hidden auto">
            <Text fontWeight="" fontSize="sm" maxW="calc(100% - 10px)">
              XRP is the native token of the XRP Ledger and is primarily used to facilitate global
              financial transfers. The XRP Ledger enhances global financial transfers and the
              exchange of several currencies by being fast, inexpensive, scalable, interoperable,
              secure, transparent, and global. With the XRPL, XRP transactions are typically settled
              within seconds, making it much faster than traditional cross-border payments, which
              can take days or even weeks. XRP transactions are also very inexpensive, with fees
              typically costing a fraction of a penny.
            </Text>
          </Box>
        </Box>
      </Box>

      <Box w="50%" pos="relative">
        <CloseButton pos="absolute" top="-30px" right="-30px" onClick={handleClose} />

        <Flex justify="space-between">
          <Link to={tokenIconLink(ROUTES.TERMINAL_CHECKS)}>
            <Circle bg="secondary" size="50px">
              <ChecksIcon stroke="textDark" fontSize="lg" />
            </Circle>
          </Link>
          <Link to={tokenIconLink(ROUTES.TERMINAL_ESCROWS)}>
            <Circle bg="secondary" size="50px">
              <HourGlassIcon color="textDark" fill="textDark" fontSize="lg" />
            </Circle>
          </Link>
          <Link to={tokenIconLink(ROUTES.TRANSACTIONS)}>
            <Circle bg="secondary" size="50px">
              <ArrowUpIcon stroke="textDark" fontSize="lg" />
            </Circle>
          </Link>
          <Circle
            bg="secondary"
            size="50px"
            cursor="pointer"
            onClick={() => setIsAddressModal(true)}
          >
            <ArrowDownIcon stroke="textDark" fontSize="lg" />
          </Circle>
          <Link to={tokenIconLink(ROUTES.EXCHANGE)}>
            <Circle bg="secondary" size="50px">
              <ExchangeIcon stroke="textDark" fill="none" fontSize="lg" />
            </Circle>
          </Link>
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
              <Text fontSize="md">${`${formatNumber(price.data)}`}</Text>
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
            opacity={0.5}
            cursor="not-allowed"
            // _hover={{ bg: "danger" }}
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
          overflow="hidden auto"
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
