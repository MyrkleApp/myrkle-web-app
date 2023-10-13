import Button from "@/components/button";
import Input from "@/components/input";
import ItemLabel from "@/components/item-label";
import { MotionBox } from "@/components/motion-elements";
import { Box, HStack, Spacer, Text } from "@chakra-ui/react";
import TokenItem from "../select-token-dropdown/token-item";
import { useState } from "react";
import { numbersOnlyRegex } from "@/constants";
import {
  useCreateTokenCheckMutation,
  useCreateXrpCheckMutation,
} from "@/features/shared/redux/xrp.api";
import { useSelector } from "react-redux";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";
import { isXrpToken } from "@/helpers";

export interface TokenDetailProps {
  token: any;
}

// wallet address 2 ====>>>  r4W82KKuXBbFTKJrJDiTkfaAnzz3SdBms9

function TokenDetail({ token }: TokenDetailProps) {
  const address = useSelector(selectAddress);

  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const [createTokenCheck, { isLoading: isCreateTokenCheckLoading }] =
    useCreateTokenCheckMutation();
  const [createXrpCheck, { isLoading: isCreateXrpCheckLoading }] = useCreateXrpCheckMutation();

  const handleConfirm = () => {
    if (isXrpToken(token)) {
      createXrpCheck({
        sender_addr: address,
        receiver_addr: receiverAddress,
        amount,
        expiry_date: expiryDate,
      })
        .unwrap()
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
      return;
    }
    createTokenCheck({
      sender_addr: address,
      receiver_addr: receiverAddress,
      token: token?.token,
      issuer: token?.issuer,
      amount,
      expiry_date: expiryDate,
    })
      .unwrap()
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <MotionBox
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        h="100%"
        pr={1}
        overflow="hidden auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Box>
          <ItemLabel title="Token" mb={1} />
          <TokenItem token={token} />
        </Box>
        <Box mb={2}>
          <ItemLabel title="Receiver address" mb={1} />
          <Input
            value={receiverAddress}
            onChange={(e: any) => setReceiverAddress(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <ItemLabel title="Amount" mb={1} />
          <Input
            value={amount}
            onChange={(e: any) =>
              e.target.value.match(numbersOnlyRegex) && setAmount(e.target.value)
            }
          />
        </Box>
        <Box mb={3}>
          <ItemLabel title="Expiry Date" mb={1} />
          <Input
            type="date"
            value={expiryDate}
            onChange={(e: any) => setExpiryDate(e.target.value)}
            sx={{
              "::-webkit-calendar-picker-indicator": {
                filter: "invert(1)",
              },
            }}
          />
        </Box>

        <Box p={3} bg="darkest" borderRadius="20px">
          <HStack mb={4}>
            <Text fontSize="xs">Transaction fee</Text>
            <Spacer />
            <Text fontSize="xs">1.00</Text>
          </HStack>
          <Button
            w="100%"
            isLoading={isCreateXrpCheckLoading || isCreateTokenCheckLoading}
            onClick={handleConfirm}
          >
            confirm
          </Button>
        </Box>
      </MotionBox>
    </>
  );
}

export default TokenDetail;
