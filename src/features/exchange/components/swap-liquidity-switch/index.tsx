import { MotionBox } from "@/components/motion-elements";
import { HStack, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { selectExchangeType } from "../../redux/exchange.selectors";
import { toggleExchangeType } from "../../redux/exchange.slice";
import Backdrop from "@/components/backdrop";
import CautionModal from "./caution-modal";

export interface TokenNftSwitchProps {
  sliderProps?: any;
}

function SwapLiquiditySwitch({ sliderProps }: TokenNftSwitchProps) {
  const exchangeType = useSelector(selectExchangeType);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const _toggleExchangeType = () => dispatch(toggleExchangeType());

  const handleProceed = () => {
    onClose();
    _toggleExchangeType();
  };

  return (
    <>
      <HStack
        w="270px"
        pos="relative"
        h="55px"
        bg="dark"
        borderRadius="30px"
        boxShadow="0 2px 5px #0f0f0f"
      >
        <MotionBox
          mt="2px"
          h="51px"
          w="130px"
          bg="darkest"
          borderRadius="30px"
          border="3px solid"
          borderColor="dark"
          pos="absolute"
          top="0"
          initial={{ left: 0, width: 125 }}
          animate={{
            left: exchangeType === "swap" ? 2 : 132,
            width: exchangeType === "swap" ? 150 : 135,
            transition: { duration: 0.4 },
          }}
          {...sliderProps}
        />
        <Text
          fontSize={exchangeType === "swap" ? "sm" : "xs"}
          fontWeight={exchangeType === "swap" ? "bold" : "400"}
          pos="absolute"
          left="60px"
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
          right="37px"
          color={exchangeType === "liquidity" ? "#fff" : "textDark"}
          cursor="pointer"
          onClick={onOpen}
        >
          Liquidity
        </Text>
      </HStack>

      <Backdrop isOpen={isOpen}>
        <CautionModal handleClose={onClose} handleProceed={handleProceed} />
      </Backdrop>
    </>
  );
}

export default SwapLiquiditySwitch;
