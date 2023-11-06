import { HStack, Image, Text } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import { useLazyGetTokenInfoQuery } from "../../redux/token.api";
import { isXrpToken } from "@/helpers";
import Skeleton1 from "@/components/skeleton";
import { useSelector } from "react-redux";
import { selectNetwork } from "@/features/wallet/redux/wallet.selectors";
import { useEffect } from "react";
import tokenPlaceholder from "@/assets/token-placeholder.png";

export interface TokenItemProps {
  token: any;
  handleClick: (value: any) => void;
}

function TokenItem({ token, handleClick }: TokenItemProps) {
  const network = useSelector(selectNetwork);

  const [getTokenInfo, { isLoading, data }] = useLazyGetTokenInfoQuery();

  // const { isLoading } = useLazyGetTokenInfoQuery({
  //   token: "BTC",
  //   issuer: "rchGBxcD1A1C2tdxF6papQYZ8kjRKMYcL",
  // });

  useEffect(() => {
    if (network !== "mainnet" && !isXrpToken(token)) return;

    getTokenInfo({ token: token.token, issuer: token.issuer });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network, token?.token, token?.issuer]);

  if (isLoading) {
    return <Skeleton1 w="100%" h="40px" mb={4} borderRadius="0" />;
  }

  return (
    <HStack
      h="40px"
      borderRadius="7px"
      cursor="pointer"
      pl={3}
      mb={4}
      bg="secondary"
      onClick={() => handleClick(network === "mainnet" ? data?.icon : tokenPlaceholder)}
    >
      <Image
        src={isXrpToken(token) ? xrpLogo : network === "mainnet" ? data?.icon : tokenPlaceholder}
        alt=""
        h="30px"
      />
      <Text fontSize="sm" fontWeight="bold" textTransform="uppercase">
        {token.token}
      </Text>
    </HStack>
  );
}

export default TokenItem;
