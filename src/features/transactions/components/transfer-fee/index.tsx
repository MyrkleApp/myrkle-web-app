import {
  useGetAccountInfoQuery,
  useLazyGetAccountTokenInfoQuery,
} from "@/features/shared/redux/xrp.api";
import { selectAddress, selectNet } from "@/features/wallet/redux/wallet.selectors";
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
  const address = useSelector(selectAddress);
  const net = useSelector(selectNet);

  const { data: accountInfo } = useGetAccountInfoQuery({ address, net });
  const [getAccountTokenInfo, { data: tokenInfo }] = useLazyGetAccountTokenInfoQuery();

  useEffect(() => {
    if (!isXrpToken({ token })) {
      getAccountTokenInfo({ net, issuer });
    }
  }, [getAccountTokenInfo, issuer, net, token]);

  const getFeeAmount = () => {
    if (isXrpToken({ token })) {
      return Number(accountInfo?.token_transfer_fee) * Number(amount);
    } else {
      return Number(tokenInfo?.transfer_fee) * Number(amount);
    }
  };

  return (
    <HStack pos="absolute" right={0} top="calc(20% - 28px)">
      <Text fontSize="xs">Transfer fee:</Text>
      <Text fontSize="xs" color="success">
        {isXrpToken({ token })
          ? formatNumber(accountInfo?.token_transfer_fee, 1)
          : formatNumber(tokenInfo?.transfer_fee, 1)}
        %
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
