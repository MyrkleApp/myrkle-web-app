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
import useGetXrpData from "../../hooks/use-get-xrp-data";
import XrpModal from "./xrp-modal";
import ROUTES from "@/routes";
import { Link } from "react-router-dom";
import AddressModal from "../wallet-details/address-modal";
import { selectAddress, selectNetwork } from "../../redux/wallet.selectors";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import tokenPlaceholder from "@/assets/token-placeholder.png";
import MyrkleLoader from "@/components/myrkle-loader";
import ResponseModal from "@/components/response-modal";
import ProceedModal from "@/features/shared/components/proceed-modal";
import { useRemoveTokenMutation } from "@/features/shared/redux/xrp.api";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import XummTxnModal from "@/components/xumm-txn-modal";
import useGetTokenInfo from "../../hooks/use-get-token-info";
import IssuerData from "@/features/shared/components/issuer-data.tsx";

export interface TokenCardProps {
  token: string;
  issuer: string;
  amount: number;
  limit?: string;
  xrpData: ReturnType<typeof useGetXrpData>;
  handleTokenUsdAmountObj: (val: any) => void;
  isFrozen?: boolean;
}

// rchGBxcD1A1C2tdxF6papQYZ8kjRKMYcL
// BTC

type TTokenModalView =
  | "default"
  | "proceed"
  | "loading"
  | "error-1"
  | "xumm-qr-code"
  | "error-2"
  | "success";

function TokenCard({
  token,
  issuer,
  amount,
  limit,
  xrpData,
  handleTokenUsdAmountObj,
  isFrozen,
}: TokenCardProps) {
  const [{ isSubmitTxnSuccess, xummTxnQrCode }, { handleSubmitTxn, resetSubmitTxnResponse }] =
    useSubmitTxn("token");

  // ==================================================================================================
  // selectors
  // ==================================================================================================

  const address = useSelector(selectAddress);
  const network = useSelector(selectNetwork);

  // ==================================================================================================
  // api
  // ==================================================================================================

  const [tokenData, { getTokenInfo }] = useGetTokenInfo();
  // const [getTokenInfo, { data: tokenData }] = useLazyGetTokenInfoQuery();
  const [removeToken] = useRemoveTokenMutation();

  const isIssuerData: boolean = tokenData?.issuerName && tokenData?.issuerIcon;

  // ==================================================================================================
  // state & disclosure
  // ==================================================================================================

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isReceiveOpen, onOpen: onReceiveOpen, onClose: onReceiveClose } = useDisclosure();

  const xrpPriceInUSD = xrpData?.price.data;

  const xrpBalanceInUSD = xrpPriceInUSD * amount;

  // const tokenPrice = tokenData?.price;

  // const tokenPriceToUSD = tokenPrice ? tokenPrice * xrpPriceInUSD : 0;

  // const tokenBalanceToUSD = tokenPriceToUSD * amount;

  const tokenBalanceToUSD = Number(tokenData?.price) * amount;

  const [tokenModalView, setTokenModalView] = useState<TTokenModalView>("default");

  // ==================================================================================================
  // effects
  // ==================================================================================================

  useEffect(() => {
    if (isXrpToken({ token })) {
      handleTokenUsdAmountObj({ [`${token}+${issuer}`]: xrpBalanceInUSD });
    }

    if (network !== "mainnet") return;

    const getTokenInformation = async () => {
      const tokenInfo: any = await getTokenInfo(token, issuer);
      handleTokenUsdAmountObj({ [`${token}+${issuer}`]: Number(tokenInfo?.price) * amount });
    };

    if (!isXrpToken({ token })) {
      getTokenInformation();
      // getTokenInfo({ token, issuer })
      //   .unwrap()
      //   .then(() => {
      //     handleTokenUsdAmountObj({ [`${token}+${issuer}`]: tokenBalanceToUSD });
      //   });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issuer, network, token, address, xrpPriceInUSD, amount, tokenData?.price]);

  useEffect(() => {
    if (xummTxnQrCode) {
      setTokenModalView("xumm-qr-code");
    }
  }, [xummTxnQrCode]);

  useEffect(() => {
    if (isSubmitTxnSuccess === null) return;

    if (isSubmitTxnSuccess) {
      setTokenModalView("success");
    } else setTokenModalView("error-2");
  }, [isSubmitTxnSuccess]);

  // ==================================================================================================
  // handlers
  // ==================================================================================================

  const handleClose = () => {
    onClose();
  };

  const tokenIconLink = (url: string) => {
    return `${url}?token=${token}&issuer=${issuer}`;
  };

  const handleReset = () => {
    onClose();
    resetSubmitTxnResponse();
  };

  const handleRemoveToken = () => {
    setTokenModalView("loading");

    removeToken({
      sender_addr: address,
      token: token,
      issuer: issuer,
    })
      .unwrap()
      .then((res) => {
        handleSubmitTxn(res);
      })
      .catch(() => setTokenModalView("error-1"));
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
              fontSize="3vh"
              // textTransform="uppercase"
            >
              {token}
            </Text>
          </HStack>

          {isIssuerData ? (
            <IssuerData
              issuerName={tokenData?.issuerName}
              issuerIcon={tokenData?.issuerIcon}
              imageProps={{ h: "20px" }}
            />
          ) : (
            <Text fontSize="xs" visibility={isXrpToken({ token }) ? "hidden" : "visible"}>
              {ellipsisAtCenter(issuer)}
            </Text>
          )}

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
                fontSize="sm"
                fontWeight="bold"
                color={
                  isPositiveChange(
                    isXrpToken({ token })
                      ? xrpData.percentageChange?.data
                      : tokenData?.percentageChange,
                  )
                    ? "success"
                    : "danger"
                }
              >
                {isXrpToken({ token })
                  ? `${isPositiveChange(xrpData.percentageChange?.data) ? "+" : "-"}${
                      xrpData.percentageChange?.data || "??"
                    }%`
                  : `${isPositiveChange(tokenData?.percentageChange) ? "+" : "-"}${
                      tokenData?.percentageChange || "??"
                    }%`}
              </Text>
            </Box>
          </RenderPercentChange>

          <VStack spacing={0} align="flex-end" w="100px">
            <Text
              className="font-face-proxima-nova-extrabld"
              fontSize="md"
              fontWeight="bold"
              textTransform="uppercase"
              mr={1}
            >
              {formatNumber(amount)}
            </Text>
            <Text color="textDark" fontSize="xs" fontWeight="bold">
              $
              {formatNumber(
                isXrpToken({ token })
                  ? xrpBalanceInUSD
                  : network === "mainnet"
                  ? tokenBalanceToUSD
                  : "-- --",
              )}
            </Text>
          </VStack>
        </Flex>

        <HStack justify="space-between" borderLeft="1px solid #353535" pl="20px" w="33%" h="55%">
          <Link to={tokenIconLink(ROUTES.TERMINAL_CHECKS)} style={{ height: "100%" }}>
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
          <Link
            to={isXrpToken({ token }) ? tokenIconLink(ROUTES.TERMINAL_ESCROWS) : "#"}
            style={{ height: "100%" }}
          >
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
          <Link to={tokenIconLink(ROUTES.TRANSACTIONS)} style={{ height: "100%" }}>
            <IconButton
              bg="secondary"
              h="100%"
              aspectRatio={1}
              borderRadius="50%"
              flexShrink={0}
              aria-label={""}
              _hover={{ bg: "secondary " }}
            >
              <ArrowUpIcon stroke="none" fontSize="2.8vh" />
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
            <ArrowDownIcon stroke="none" fontSize="2.8vh" />
          </IconButton>
          <Link to={tokenIconLink(ROUTES.EXCHANGE)} style={{ height: "100%" }}>
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
          <>
            {tokenModalView === "default" && (
              <TokenCardModal
                data={tokenData}
                token={token}
                issuer={issuer}
                amount={amount}
                tokenBalanceToUSD={tokenBalanceToUSD}
                limit={limit}
                handleClose={handleClose}
                handleRemoveClick={() => setTokenModalView("proceed")}
                isFrozen={isFrozen}
                tokenPriceToUSD={tokenData?.price}
              />
            )}

            {tokenModalView === "loading" && <MyrkleLoader />}

            {tokenModalView === "error-1" && (
              <ResponseModal isError={true} handleClose={handleReset} />
            )}

            {tokenModalView === "proceed" && (
              <ProceedModal
                text="You are about to remove this token"
                isLoading={false}
                handleClose={handleClose}
                handleProceed={handleRemoveToken}
              />
            )}

            {tokenModalView === "xumm-qr-code" && (
              <XummTxnModal qrCodeImage={xummTxnQrCode} handleClose={handleReset} />
            )}

            {tokenModalView === "error-2" && (
              <ResponseModal isError={true} handleClose={handleReset} />
            )}

            {tokenModalView === "success" && (
              <ResponseModal isError={false} handleClose={handleReset} />
            )}
          </>
        )}
      </Backdrop>

      <Backdrop isOpen={isReceiveOpen}>
        <AddressModal
          handleClose={onReceiveClose}
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
