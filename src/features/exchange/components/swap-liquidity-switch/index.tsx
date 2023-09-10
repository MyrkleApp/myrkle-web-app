import { MotionBox } from "@/components/motion-elements";
import { HStack, Spacer, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { selectExchangeType } from "../../redux/exchange.selectors";
import { toggleExchangeType } from "../../redux/exchange.slice";

export interface TokenNftSwitchProps {
  sliderProps?: any;
}

function SwapLiquiditySwitch({ sliderProps }: TokenNftSwitchProps) {
  const exchangeType = useSelector(selectExchangeType);

  const dispatch = useDispatch();
  const _toggleExchangeType = () => dispatch(toggleExchangeType());

  return (
    <HStack
      w="225px"
      pos="relative"
      h="44px"
      bg="dark"
      borderRadius="30px"
      boxShadow="0 2px 5px #0f0f0f"
    >
      <MotionBox
        mt="2px"
        h="40px"
        w="130px"
        bg="darkest"
        borderRadius="30px"
        border="3px solid"
        borderColor="dark"
        pos="absolute"
        top="0"
        initial={{ left: 0, width: 125 }}
        animate={{
          left: exchangeType === "swap" ? 2 : 118,
          width: exchangeType === "swap" ? 120 : 105,
          transition: { duration: 0.4 },
        }}
        {...sliderProps}
      />
      <Text
        fontSize={exchangeType === "swap" ? "sm" : "xs"}
        fontWeight={exchangeType === "swap" ? "bold" : "400"}
        pos="absolute"
        left="45px"
        color={exchangeType === "swap" ? "#fff" : "textDark"}
        cursor="pointer"
        onClick={_toggleExchangeType}
      >
        Swap
      </Text>
      <Spacer />
      <Text
        fontSize={exchangeType === "liquidity" ? "sm" : "xs"}
        fontWeight={exchangeType === "liquidity" ? "bold" : "400"}
        pos="absolute"
        right="23px"
        color={exchangeType === "liquidity" ? "#fff" : "textDark"}
        cursor="pointer"
        onClick={_toggleExchangeType}
      >
        Liquidity
      </Text>
    </HStack>
  );
}

export default SwapLiquiditySwitch;
