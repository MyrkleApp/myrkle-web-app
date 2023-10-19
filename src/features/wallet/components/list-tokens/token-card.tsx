import { Flex, HStack, IconButton, Image, Text, VStack, useDisclosure } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import ChecksIcon from "@/icons/checks";
import HourGlassIcon from "@/icons/hour-glass";
import ArrowUpIcon from "@/icons/arrow-up";
import ArrowDownIcon from "@/icons/arrow-down";
import ExchangeIcon from "@/icons/exchange";
import Backdrop from "@/components/backdrop";
import TokenCardModal from "./token-card-modal";
import { ellipsisAtCenter, formatNumber, isPositiveChange, isXrpToken } from "@/helpers";
import { useGetTokenInfoQuery } from "@/features/shared/redux/token.api";
import useGetXrpData from "../../hooks/use-get-xrp-data";
import XrpModal from "./xrp-modal";
import ROUTES from "@/routes";
import { Link } from "react-router-dom";
import AddressModal from "../wallet-details/address-modal";
import qrCodeImage from "@/assets/qr-code.png";
import { selectAddress } from "../../redux/wallet.selectors";
import { useSelector } from "react-redux";

export interface TokenCardProps {
  token: string;
  issuer: string;
  amount: string;
}

// rchGBxcD1A1C2tdxF6papQYZ8kjRKMYcL
// BTC

function TokenCard({ token, issuer, amount }: TokenCardProps) {
  const xrpData = useGetXrpData();

  const address = useSelector(selectAddress);

  const { data: tokenData, isLoading: isTokenDataLoading } = useGetTokenInfoQuery({
    token: "BTC",
    issuer: "rchGBxcD1A1C2tdxF6papQYZ8kjRKMYcL",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isReceiveOpen, onOpen: onReceiveOpen, onClose: onReceiveClose } = useDisclosure();

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
          <HStack h="100%">
            <Image src={xrpLogo} alt="" h="60%" />
            <Text
              className="font-face-proxima-nova-extrabld"
              fontSize="2.5vh"
              textTransform="uppercase"
            >
              {token}
            </Text>
          </HStack>

          <Text fontSize="xs">{ellipsisAtCenter(issuer)}</Text>

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

          <VStack spacing={0} align="flex-end">
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
              $600,043.89
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

export default TokenCard;
