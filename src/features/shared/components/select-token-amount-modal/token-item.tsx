import { HStack, Image, Text } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import { useGetTokenInfoQuery } from "../../redux/token.api";
import { isXrpToken } from "@/helpers";
import Skeleton1 from "@/components/skeleton";

export interface TokenItemProps {
  token: any;
  handleClick: () => void;
}

function TokenItem({ token, handleClick }: TokenItemProps) {
  const { isLoading } = useGetTokenInfoQuery({
    token: "BTC",
    issuer: "rchGBxcD1A1C2tdxF6papQYZ8kjRKMYcL",
  });

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
      onClick={handleClick}
    >
      <Image src={isXrpToken(token) ? xrpLogo : xrpLogo} alt="" h="30px" />
      <Text fontSize="sm" fontWeight="bold" textTransform="uppercase">
        {token.token}
      </Text>
    </HStack>
  );
}

export default TokenItem;
