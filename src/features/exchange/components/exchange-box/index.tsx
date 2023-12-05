import { Box, HStack, Image, Spacer, Text, VStack, useDisclosure } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import Input from "@/components/input";
import Backdrop from "@/components/backdrop";
import SelectTokenModal from "@/features/shared/components/select-token-modal";
import { IToken } from "@/features/shared/types";
import { formatNumber, isXrpToken } from "@/helpers";
import tokenPlaceholder from "@/assets/token-placeholder.png";
import { useGetAccountTokensQuery, useGetBalanceQuery } from "@/features/shared/redux/xrp.api";
import { selectAddress, selectNet } from "@/features/wallet/redux/wallet.selectors";
import { useSelector } from "react-redux";

export interface ExchangeBoxProps {
  token: IToken;
  handleToken: (token: IToken) => void;
  amount: string | number;
  handleAmount: (value: any) => void;
}

function ExchangeBox({ token, handleToken, amount, handleAmount }: ExchangeBoxProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const address = useSelector(selectAddress);
  const net = useSelector(selectNet);

  const { data: xrpBalance } = useGetBalanceQuery({ address, net });

  const { data: myTokensData } = useGetAccountTokensQuery({ address, net });

  const tokenBalance = isXrpToken(token)
    ? xrpBalance?.balance
    : myTokensData?.find(
        (myTokenItem: any) =>
          myTokenItem?.token === token.token && myTokenItem.issuer === token.issuer,
      )?.amount;

  const handleTokenClick = (token: IToken) => {
    handleToken(token);
    onClose();
  };

  return (
    <>
      <Box
        h="100%"
        maxH="110px"
        bg="darkest"
        borderRadius="13px"
        p={1}
        pb={3}
        cursor="pointer"
        onClick={onOpen}
      >
        <HStack bg="secondary" borderRadius="10px" h="calc(100% - 15px)" mb={1} pl={3} pr={1}>
          <Image
            src={(isXrpToken(token) ? xrpLogo : token?.icon) || tokenPlaceholder}
            alt=""
            h="55%"
            borderRadius="50%"
          />
          <VStack spacing={0} align="flex-start">
            <Text
              className="font-face-proxima-nova-extrabld"
              fontSize="sm"
              textTransform="uppercase"
            >
              {token?.token}
            </Text>
            <Text fontSize="xs" mt="-2px" display={isXrpToken(token) ? "none" : ""}>
              {token?.issuer}
            </Text>
          </VStack>
          <Spacer />
          <Input
            value={amount}
            onChange={handleAmount}
            placeholder="0.00"
            fontSize="2xl"
            textAlign="right"
            w="30%"
            border="none"
            onClick={(e: any) => e.stopPropagation()}
          />
        </HStack>
        <Text fontSize="xs" px={3}>
          Balance: {formatNumber(tokenBalance || "-- --")}
        </Text>
      </Box>

      <Backdrop isOpen={isOpen}>
        <SelectTokenModal handleClose={onClose} handleToken={handleTokenClick} showMyTokensOption />
      </Backdrop>
    </>
  );
}

export default ExchangeBox;
