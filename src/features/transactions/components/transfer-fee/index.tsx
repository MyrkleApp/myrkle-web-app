import { useLazyGetAccountTokenInfoQuery } from "@/features/shared/redux/xrp.api";
import { selectNet } from "@/features/wallet/redux/wallet.selectors";
import { formatNumber, isXrpToken } from "@/helpers";
import { HStack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export interface TransferFeeProps {
  amount: number | string;
  token: string;
  issuer: string;
}

function TransferFee({ token, issuer, amount }: TransferFeeProps) {
  const net = useSelector(selectNet);

  const [getAccountTokenInfo, { data: tokenInfo }] = useLazyGetAccountTokenInfoQuery();

  useEffect(() => {
    if (!isXrpToken({ token })) {
      getAccountTokenInfo({ net, issuer });
    }
  }, [getAccountTokenInfo, issuer, net, token]);

  const getFeeAmount = () => {
    if (isXrpToken({ token })) {
      return 0;
    } else {
      return (Number(tokenInfo?.transfer_fee) * Number(amount)) / 100;
    }
  };

  return (
    <HStack pos="absolute" right={0} top="calc(20% - 28px)">
      <Text fontSize="xs">Transfer fee:</Text>
      <Text fontSize="xs" color="success">
        {isXrpToken({ token }) ? "0" : formatNumber(tokenInfo?.transfer_fee, 1)}%
      </Text>
      <Text
        fontSize="xs"
        textAlign="right"
        border="1px solid"
        borderColor="secondary"
        px={2}
        borderRadius="20px"
        minW="70px"
      >
        - {formatNumber(getFeeAmount())}
      </Text>
    </HStack>
  );
}

export default TransferFee;
