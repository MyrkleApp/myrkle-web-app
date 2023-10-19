import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import { useLazyGetTokenInfoQuery } from "@/features/shared/redux/token.api";
import { useSelector } from "react-redux";
import { selectNetwork } from "@/features/wallet/redux/wallet.selectors";
import { useEffect } from "react";
import coinIcon from "@/assets/coin-dollar.svg";
import { isXrpToken } from "@/helpers";

export interface TokenItemProps {
  token?: any;
  handleClick?: (value: any) => void;
}

function TokenItem({ token, handleClick }: TokenItemProps) {
  const network = useSelector(selectNetwork);

  const [getTokenInfo, { data }] = useLazyGetTokenInfoQuery();

  useEffect(() => {
    if (network !== "mainnet") return;

    getTokenInfo({ token: token?.token, issuer: token?.issuer });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network, token?.issuer, token?.token]);

  return (
    <HStack h="50px" borderRadius="7px" bg="gray" px={2} mb={2} onClick={handleClick}>
      <Image src={isXrpToken(token) ? xrpLogo : data?.icon || coinIcon} alt="" h="35px" />
      <VStack align="flex-start" spacing={0}>
        <Text fontSize="xs" fontWeight="bold">
          {token?.token}
        </Text>
        <Text fontSize="2xs">{token?.issuer}</Text>
      </VStack>
    </HStack>
  );
}

export default TokenItem;
