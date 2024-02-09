import { xrpIssuer } from "@/constants";
import TokenIcon from "@/features/shared/components/token-icon";
import { ellipsisAtCenter } from "@/helpers";
import { HStack, Spacer, Text, VStack } from "@chakra-ui/react";

export interface TokenItemProps {
  token: string;
  issuer: string;
  icon: string;
  amount: number | string;
}

function TokenItem({ token, issuer, amount }: TokenItemProps) {
  return (
    <HStack bg="dark" borderRadius="10px" h="100%" pl={3} pr={1}>
      <TokenIcon token={token} issuer={issuer} h="65%" />
      {/* <Image src={icon} alt="" h="65%" /> */}
      <VStack spacing={0} align="flex-start">
        <Text
          className="font-face-proxima-nova-extrabld"
          fontSize={["3vh", null, null, null, null, "30px"]}
          textTransform="uppercase"
        >
          {token}
        </Text>
        <Text fontSize="xs" mt="-2px">
          {issuer !== xrpIssuer ? ellipsisAtCenter(issuer, 18) : ""}
        </Text>
      </VStack>
      <Spacer />
      <Text
        fontSize={["4vh", null, null, null, null, "35px"]}
        mt={-4}
        pr={[3, null, null, null, null, 7]}
        pos="absolute"
        right={0}
      >
        {Number(amount).toFixed(2)}
      </Text>
    </HStack>
  );
}

export default TokenItem;
