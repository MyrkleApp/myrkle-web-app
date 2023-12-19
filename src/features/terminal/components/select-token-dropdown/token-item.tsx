import { HStack, Image, Spacer, Text, VStack } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import { useLazyGetTokenInfoQuery } from "@/features/shared/redux/token.api";
import { useSelector } from "react-redux";
import { selectAddress, selectNet, selectNetwork } from "@/features/wallet/redux/wallet.selectors";
import { useEffect } from "react";
import tokenPlaceholder from "@/assets/token-placeholder.png";
import { ellipsisAtCenter, formatNumber, isXrpToken } from "@/helpers";
import IssuerData from "@/features/shared/components/issuer-data.tsx";
import { useGetBalanceQuery } from "@/features/shared/redux/xrp.api";
import { useSearchParams } from "react-router-dom";

export interface TokenItemProps {
  token?: any;
  handleClick?: (value: any) => void;
  isDisabled?: boolean;
  useUrlTokenBalance?: boolean;
}

function TokenItem({ token, handleClick, isDisabled, useUrlTokenBalance }: TokenItemProps) {
  const [searchParams] = useSearchParams();
  const urlTokenBalance = searchParams.get("balance");

  const network = useSelector(selectNetwork);
  const address = useSelector(selectAddress);
  const net = useSelector(selectNet);

  const [getTokenInfo, { data }] = useLazyGetTokenInfoQuery();

  const { data: xrpBalance } = useGetBalanceQuery({ address, net });

  const isIssuerData: boolean = data?.issuerName && data?.issuerIcon;
  const tokenBalance = isXrpToken(token) ? xrpBalance?.balance : token?.balance;

  const balanceToDisplay = !useUrlTokenBalance ? tokenBalance : urlTokenBalance || tokenBalance;

  useEffect(() => {
    if (isXrpToken(token)) return;
    if (network !== "mainnet") return;

    getTokenInfo({ token: token?.token, issuer: token?.issuer });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network, token?.issuer, token?.token]);

  return (
    <HStack
      h="50px"
      borderRadius="7px"
      bg="gray"
      px={2}
      mb={2}
      opacity={isDisabled ? 0.3 : 1}
      cursor={isDisabled ? "not-allowed" : "pointer"}
      onClick={handleClick}
    >
      <Image src={isXrpToken(token) ? xrpLogo : data?.icon || tokenPlaceholder} alt="" h="35px" />
      <VStack align="flex-start" spacing={0}>
        <Text fontSize={isXrpToken(token) ? "md" : "xs"} fontWeight="bold">
          {token?.token}
        </Text>
        {isIssuerData ? (
          <IssuerData
            issuerName={data?.issuerName}
            issuerIcon={data?.issuerIcon}
            imageProps={{ h: "15px" }}
          />
        ) : (
          <Text fontSize="2xs" display={isXrpToken(token) ? "none" : ""}>
            {ellipsisAtCenter(token?.issuer)}
          </Text>
        )}
      </VStack>
      <Spacer />
      <Text fontSize="2xs" mt={7}>
        Balance: {formatNumber(balanceToDisplay, 2)}
      </Text>
    </HStack>
  );
}

export default TokenItem;
