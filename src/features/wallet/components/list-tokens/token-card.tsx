import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import ChecksIcon from "@/icons/checks";
import HourGlassIcon from "@/icons/hour-glass";
import ArrowUpIcon from "@/icons/arrow-up";
import ArrowDownIcon from "@/icons/arrow-down";
import ExchangeIcon from "@/icons/exchange";
import Backdrop from "@/components/backdrop";
import TokenCardModal from "./token-card-modal";
import { ellipsisAtCenter, formatNumber, isPositiveChange, isXrpToken } from "@/helpers";
import { useLazyGetTokenInfoQuery } from "@/features/shared/redux/token.api";
import useGetXrpData from "../../hooks/use-get-xrp-data";
import XrpModal from "./xrp-modal";
import ROUTES from "@/routes";
import { Link } from "react-router-dom";
import AddressModal from "../wallet-details/address-modal";
import qrCodeImage from "@/assets/qr-code.png";
import { selectAddress, selectNetwork } from "../../redux/wallet.selectors";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import tokenPlaceholder from "@/assets/token-placeholder.png";

export interface TokenCardProps {
  token: string;
  issuer: string;
  amount: number;
  limit?: string;
  xrpData: ReturnType<typeof useGetXrpData>;
  handleTokenUsdAmountObj: (val: any) => void;
}

// rchGBxcD1A1C2tdxF6papQYZ8kjRKMYcL
// BTC

function TokenCard({
  token,
  issuer,
  amount,
  limit,
  xrpData,
  handleTokenUsdAmountObj,
}: TokenCardProps) {
  const address = useSelector(selectAddress);
  const network = useSelector(selectNetwork);

  const [getTokenInfo, { data: tokenData, isLoading: isTokenDataLoading }] =
    useLazyGetTokenInfoQuery();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isReceiveOpen, onOpen: onReceiveOpen, onClose: onReceiveClose } = useDisclosure();

  const xrpBalanceToUSD = xrpData?.price.data * amount;
  const tokenBalanceToUSD = xrpData?.price.data * amount * (tokenData?.price || 0);

  useEffect(() => {
    if (isXrpToken({ token })) {
      handleTokenUsdAmountObj({ [`${token}+${issuer}`]: xrpBalanceToUSD });
    }

    if (network !== "mainnet") return;

    if (!isXrpToken({ token })) {
      getTokenInfo({ token, issuer })
        .unwrap()
        .then(() => {
          handleTokenUsdAmountObj({ [`${token}+${issuer}`]: tokenBalanceToUSD });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTokenInfo, issuer, network, token, tokenBalanceToUSD]);

  const handleClose = () => {
    onClose();
  };

  const tokenIconLink = (url: string) => {
    return `${url}?token=${token}&issuer=${issuer}`;
  };

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        // minH="75px"
        h="calc(100% / 3.25)"
        flexShrink={0}
        bg="dark"
        borderRadius="4vh"
        px="2.5%"
        cursor="pointer"
        onClick={onOpen}
      >
        <Flex justify="space-between" align="center" w="67%" h="100%" pr="20px">
          <HStack h="100%" w="100px">
            <Image
              src={
                isXrpToken({ token })
                  ? xrpLogo
                  : network === "mainnet"
                  ? tokenData?.icon
                  : tokenPlaceholder
              }
              alt=""
              h="60%"
            />
            <Text
              className="font-face-proxima-nova-extrabld"
              fontSize="2.5vh"
              textTransform="uppercase"
            >
              {token}
            </Text>
          </HStack>

          <Text fontSize="xs" visibility={isXrpToken({ token }) ? "hidden" : "visible"}>
            {ellipsisAtCenter(issuer)}
          </Text>

          <RenderPercentChange isXrpToken={isXrpToken({ token })}>
            <Box
              pos="relative"
              _hover={{
                div: {
                  display: "block",
                },
              }}
            >
              <Box
                display="none"
                pos="absolute"
                top={-4}
                left="50%"
                transform="translateX(-50%)"
                border="1px solid black"
                borderRadius="10px"
                bg="#000"
                p="1px 5px"
                fontSize="xs"
              >
                {isXrpToken({ token }) ? xrpData.pair : tokenData?.pair}
              </Box>
              <Text
                fontSize="xs"
                fontWeight="bold"
                color={
                  isXrpToken({ token })
                    ? isPositiveChange(xrpData.percentageChange?.data)
                      ? "success"
                      : "danger"
                    : "success"
                }
              >
                {isXrpToken({ token })
                  ? `${isPositiveChange(xrpData.percentageChange?.data) ? "+" : ""}${
                      xrpData.percentageChange?.data || "??"
                    }%`
                  : "+0.02%"}
              </Text>
            </Box>
          </RenderPercentChange>

          <VStack spacing={0} align="flex-end" w="100px">
            <Text
              className="font-face-proxima-nova-extrabld"
              fontSize="sm"
              fontWeight="bold"
              textTransform="uppercase"
              mr={1}
            >
              {formatNumber(amount)}
            </Text>
            <Text color="textDark" fontSize="2xs" fontWeight="bold">
              $
              {formatNumber(
                isXrpToken({ token })
                  ? xrpBalanceToUSD
                  : network === "mainnet"
                  ? tokenBalanceToUSD
                  : "-- --",
              )}
            </Text>
          </VStack>
        </Flex>

        <HStack justify="space-between" borderLeft="1px solid #353535" pl="20px" w="33%" h="55%">
          <Link to={tokenIconLink(ROUTES.TERMINAL_CHECKS)}>
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
          </Link>
          <Link to={isXrpToken({ token }) ? tokenIconLink(ROUTES.TERMINAL_ESCROWS) : "#"}>
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
          </Link>
          <Link to={tokenIconLink(ROUTES.TRANSACTIONS)}>
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
          </Link>
          <IconButton
            bg="secondary"
            h="100%"
            aspectRatio={1}
            borderRadius="50%"
            flexShrink={0}
            aria-label={""}
            onClick={(e: any) => {
              e.stopPropagation();
              onReceiveOpen();
            }}
            _hover={{ bg: "secondary " }}
          >
            <ArrowDownIcon stroke="textDark" fontSize="2.8vh" />
          </IconButton>
          <Link to={tokenIconLink(ROUTES.EXCHANGE)}>
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
          </Link>
        </HStack>
      </Flex>

      <Backdrop isOpen={isOpen}>
        {isXrpToken({ token }) ? (
          <XrpModal data={xrpData} handleClose={handleClose} />
        ) : (
          <TokenCardModal
            data={tokenData}
            token={token}
            issuer={issuer}
            amount={amount}
            tokenBalanceToUSD={tokenBalanceToUSD}
            limit={limit}
            isLoading={isTokenDataLoading}
            handleClose={handleClose}
          />
        )}
      </Backdrop>

      <Backdrop isOpen={isReceiveOpen}>
        <AddressModal
          handleClose={onReceiveClose}
          qrCodeImage={qrCodeImage}
          address={address}
          handleXAddress={() => {
            /** */
          }}
          hideXAddressButton
        />
      </Backdrop>
    </>
  );
}

const RenderPercentChange = ({ isXrpToken, children }: any) => {
  const network = useSelector(selectNetwork);

  if (isXrpToken || network === "mainnet") return <>{children}</>;

  return "-- --";
};

export default TokenCard;
