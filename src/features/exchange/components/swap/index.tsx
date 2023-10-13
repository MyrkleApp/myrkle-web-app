import Button from "@/components/button";
import ExchangeIcon from "@/icons/exchange";
import { Box, Circle, Text } from "@chakra-ui/react";
import ExchangeBox from "../exchange-box";
import { xrpToken } from "@/constants";
import { IToken } from "@/features/shared/types";
import { useState } from "react";

function Swap() {
  const [fromToken, setFromToken] = useState<IToken>(xrpToken);
  const [toToken, setToToken] = useState<IToken>(xrpToken);

  const handleFromToken = (token: IToken) => {
    setFromToken(token);
  };

  const handleToToken = (token: IToken) => {
    setToToken(token);
  };

  return (
    <>
      <Text color="textDark" fontSize="xs" fontWeight="bold" pos="absolute" top="13%">
        From
      </Text>
      <Box pos="absolute" top="19%" w="100%" h="20%">
        <ExchangeBox token={fromToken} handleToken={handleFromToken} />
      </Box>

      <Circle
        bg="secondary"
        size="22px"
        cursor="pointer"
        pos="absolute"
        top="47%"
        left="50%"
        transform="translate(-50%, -50%) rotate(90deg)"
      >
        <ExchangeIcon stroke="gray" fill="none" />
      </Circle>

      <Text color="textDark" fontSize="xs" fontWeight="bold" pos="absolute" top="50%">
        To
      </Text>
      <Box pos="absolute" top="56%" w="100%" h="20%">
        <ExchangeBox token={toToken} handleToken={handleToToken} />
      </Box>

      <Button bg="secondary" w="100%" pos="absolute" bottom="3%">
        confirm
      </Button>
    </>
  );
}

export default Swap;
