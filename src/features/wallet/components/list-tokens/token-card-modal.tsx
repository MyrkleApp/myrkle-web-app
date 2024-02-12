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
import ItemLabel from "@/components/item-label";
import ArrowDownIcon from "@/icons/arrow-down";
import ArrowUpIcon from "@/icons/arrow-up";
import ChecksIcon from "@/icons/checks";
import ExchangeIcon from "@/icons/exchange";
import HourGlassIcon from "@/icons/hour-glass";
import CancelIcon from "@/icons/cancel";
import TokenEditables from "./token-editables";
import { selectAddress, selectNet, selectNetwork } from "../../redux/wallet.selectors";
import { useSelector } from "react-redux";
import tokenPlaceholder from "@/assets/token-placeholder.png";
import { formatNumber, isPositiveChange } from "@/helpers";
import { useGetAccountTokenInfoQuery } from "@/features/shared/redux/xrp.api";
import RenderElement from "@/components/render-element";
import { Link } from "react-router-dom";
import ROUTES from "@/routes";
import AddressModal from "../wallet-details/address-modal";
import IssuerData from "@/features/shared/components/issuer-data.tsx";

export interface TokenCardModalProps {
  data: any;
  token: string;
  issuer: string;
  amount: number;
  tokenBalanceToUSD: number;
  limit?: string;
  handleClose: () => void;
  handleRemoveClick: () => void;
  isFrozen?: boolean;
  tokenPriceToUSD: number;
}

// rchGBxcD1A1C2tdxF6papQYZ8kjRKMYcL
// BTC

function TokenCardModal({
  data,
  token,
  issuer,
  amount,
  tokenBalanceToUSD,
  limit,
  handleClose,
  handleRemoveClick,
  isFrozen,
  tokenPriceToUSD,
}: TokenCardModalProps) {
  const ref = useRef(null);

  const network = useSelector(selectNetwork);
  const net = useSelector(selectNet);
  const address = useSelector(selectAddress);

  const [isAddressModal, setIsAddressModal] = useState(false);

  const isIssuerData: boolean = data?.issuerName && data?.issuerIcon;

  const { data: accountTokenInfo, isLoading: isAccountTokenInfoLoading } =
    useGetAccountTokenInfoQuery({ issuer, net });

  useOutsideClick({
    ref,
    handler: () => {
      if (!isAddressModal) {
        handleClose();
      }
    },
  });

  const tokenIconLink = (url: string) => {
    return `${url}?token=${token}&issuer=${issuer}`;
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
            <Image src={data?.icon || tokenPlaceholder} alt="logo" h="35px" />
            <VStack align="flex-start" spacing="0">
              <Text fontWeight="bold" fontSize="md" textTransform="uppercase">
                {token}
              </Text>
              {network === "mainnet" && (
                <Text
                  fontSize="2xs"
                  mt="-2px"
                  color={isPositiveChange(data?.percentageChange) ? "success" : "danger"}
                >
                  {`${isPositiveChange(data?.percentageChange) ? "+" : "-"}${
                    data?.percentageChange || "??"
                  }%`}
                </Text>
              )}
            </VStack>
          </HStack>

          <Spacer />

          <VStack align="flex-end" spacing="0">
            <Text
              fontWeight="bold"
              fontSize="2xl"
              textTransform="uppercase"
              wordBreak="break-all"
              textAlign="right"
            >
              {formatNumber(amount)}
            </Text>
            <Text fontSize="sm" fontWeight="bold" mt="-2px" color="textDark">
              ${network === "mainnet" ? tokenBalanceToUSD : "-- --"}
            </Text>
          </VStack>
        </HStack>

        {/* <HStack mb={4}>
          <Text fontSize="sm" fontWeight="bold">
            Ripple
          </Text>
          <Switch colorScheme="whatsapp" />
        </HStack> */}

        <ItemLabel title="Index" fontSize="sm" mb={0} />
        <RenderElement isLoading={isAccountTokenInfoLoading} w="100%" h="45px" mb={2}>
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
              {accountTokenInfo?.index}
            </Text>
          </Box>
        </RenderElement>

        <ItemLabel title="Issuer" fontSize="sm" mb={0} />
        <Box
          w="100%"
          bg="dark"
          borderRadius="12px"
          px={4}
          py={3}
          mb={2}
          boxShadow="0 2px 8px #00000040"
        >
          {isIssuerData ? (
            <IssuerData
              issuerName={data?.issuerName}
              issuerIcon={data?.issuerIcon}
              imageProps={{ h: "20px" }}
            />
          ) : (
            <Text fontWeight="bold" fontSize="sm">
              {issuer}
            </Text>
          )}
        </Box>

        <ItemLabel title="Description" fontSize="sm" />
        <Box
          pos="absolute"
          bottom={0}
          bg="dark"
          h="calc(100% - 273px)"
          borderRadius="12px"
          p={4}
          boxShadow="0 2px 8px #00000040"
          w="100%"
        >
          <Box h="95%" mt="-5px" overflow="hidden auto">
            <Text fontWeight="" fontSize="xs" maxW="calc(100% - 10px)">
              {data?.description || "No description available."}
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
          <Circle bg="secondary" size="50px">
            <HourGlassIcon color="textDark" fill="textDark" fontSize="lg" />
          </Circle>
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

        {isFrozen && (
          <Flex
            justify="center"
            align="center"
            w="100%"
            pos="absolute"
            top="70px"
            bg="dark"
            borderRadius="10px"
            px={4}
            py={1}
            mb={2}
            boxShadow="0 2px 8px #00000040"
          >
            <Text fontSize="xs" color="danger">
              NOTE: This token is frozen
            </Text>
          </Flex>
        )}

        <SimpleGrid
          columns={4}
          h="100px"
          spacing={3}
          mb={2}
          w="100%"
          pos="absolute"
          top={isFrozen ? "110px" : "90px"}
        >
          <RenderElement isLoading={isAccountTokenInfoLoading} w="auto" h="auto">
            <VStack
              bg="dark"
              borderRadius="12px"
              pt={6}
              spacing={5}
              boxShadow="0 2px 8px #00000040"
            >
              <Text fontSize="md">{accountTokenInfo?.tick_size}</Text>
              <Text fontSize="2xs">Tick</Text>
            </VStack>
          </RenderElement>
          <VStack
            bg="dark"
            borderRadius="12px"
            pt={6}
            spacing={5}
            boxShadow="0 2px 8px #00000040"
            cursor="pointer"
            pos="relative"
            _hover={{ "#complete-price": { display: "block" } }}
          >
            <Text
              id="complete-price"
              display="none"
              fontSize="sm"
              bg="#000"
              px={3}
              borderRadius={10}
              pos="absolute"
              top="0"
              left="50%"
              transform="translateX(-50%)"
            >
              ${formatNumber(tokenPriceToUSD)}
            </Text>

            <Text
              fontSize="md"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              w="calc(100% - 10px)"
              textAlign="center"
            >
              ${formatNumber(tokenPriceToUSD)}
            </Text>
            <Text fontSize="2xs">Price</Text>
          </VStack>
          <VStack bg="dark" borderRadius="12px" pt={6} spacing={5} boxShadow="0 2px 8px #00000040">
            <Text fontSize="md">{network === "mainnet" ? data?.holders : "-- --"}</Text>
            <Text fontSize="2xs">Holders</Text>
          </VStack>
          <VStack
            h="100%"
            bg="dark"
            borderRadius="12px"
            pt={6}
            spacing={3}
            boxShadow="0 2px 8px #00000040"
            cursor="pointer"
            _hover={{ bg: "danger" }}
            onClick={handleRemoveClick}
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
          h={isFrozen ? "calc(100% - 220px)" : "calc(100% - 200px)"}
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
          <Box mt="15px" h="calc(100% - 30px)" w="calc(100% - 15px)" overflow="hidden auto">
            <TokenEditables
              data={data}
              accountTokenInfo={accountTokenInfo}
              limit={limit}
              issuer={issuer}
              icon={data?.icon || tokenPlaceholder}
            />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default TokenCardModal;
