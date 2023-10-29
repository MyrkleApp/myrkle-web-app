import Button from "@/components/button";
import Input from "@/components/input";
import { MotionBox } from "@/components/motion-elements";
import {
  Box,
  CloseButton,
  Flex,
  HStack,
  Image,
  Spacer,
  Text,
  useOutsideClick,
} from "@chakra-ui/react";
import { useRef } from "react";
import { AnimatePresence } from "framer-motion";
import ItemLabel from "@/components/item-label";
import TokenItem from "./token-item";
import ArrowFlatRightIcon from "@/icons/arrow-flat-right";
import xrpLogo from "@/assets/xrp-logo.svg";
import { useSelector } from "react-redux";
import { selectAddress, selectNet } from "@/features/wallet/redux/wallet.selectors";
import { useGetAccountTokensQuery } from "../../redux/xrp.api";
import { numbersOnlyRegex } from "@/constants";

export interface SelectTokenAmountModalProps {
  selectedToken: any;
  showTokenList: boolean;
  amount: number | string;
  hideAmount?: boolean;
  handleShowTokenList: (isOpen: boolean) => void;
  handleTokenClick: (token: any) => void;
  handleAmount: (value: number | string) => void;
  handleConfirmClick: () => void;
  handleClose: () => void;
}

function SelectTokenAmountModal({
  selectedToken,
  showTokenList,
  amount,
  hideAmount,
  handleShowTokenList,
  handleTokenClick,
  handleAmount,
  handleConfirmClick,
  handleClose,
}: SelectTokenAmountModalProps) {
  const address = useSelector(selectAddress);
  const net = useSelector(selectNet);

  const { data: tokensData } = useGetAccountTokensQuery({ address, net });

  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: handleClose,
  });

  return (
    <MotionBox
      ref={ref}
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      h="190px"
      w="300px"
      p={4}
      bg="darker"
      borderRadius="15px"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        height: showTokenList ? "420px" : "190px",
      }}
      exit={{ opacity: 0 }}
    >
      <Flex justify="space-between" pl={3}>
        <ItemLabel title="Select Token" />
        <CloseButton onClick={handleClose} />
      </Flex>

      <Box px={4} mt={1} h="calc(100% - 50px)" pos="relative">
        <AnimatePresence>
          {!selectedToken && !showTokenList && (
            <MotionBox
              h="45px"
              bg="secondary"
              borderRadius="7px"
              p={1}
              cursor="pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => handleShowTokenList(true)}
            >
              <HStack h="100%" bg="#4F4F4F" borderRadius="inherit" py={1} pl={3} pr={2}>
                <Text fontSize="xs">Select a token</Text>
                <Spacer />
                <ArrowFlatRightIcon color="#D9D9D9" fontSize="2xs" />
              </HStack>
            </MotionBox>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showTokenList && (
            <MotionBox
              h="calc(100% - 50px)"
              w="calc(100% - 33px)"
              pos="absolute"
              top={0}
              overflow="hidden auto"
              // border="1px solid yellow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              pr={1}
            >
              {/* <TokenItem token={xrpToken} handleClick={() => handleTokenClick(xrpToken)} /> */}
              {tokensData?.map((tokenData: any, i: number) => (
                <TokenItem
                  key={i}
                  token={tokenData}
                  handleClick={() => handleTokenClick(tokenData)}
                />
              ))}
            </MotionBox>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedToken && !showTokenList && (
            <MotionBox
              display="flex"
              h="45px"
              bg="secondary"
              borderRadius="7px"
              p={1}
              gap={1}
              cursor="pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HStack
                w={!hideAmount ? "50%" : "100%"}
                bg="#4F4F4F"
                borderRadius="inherit"
                py={1}
                pl={2}
                pr={2}
                onClick={() => {
                  handleShowTokenList(true);
                  handleAmount("");
                }}
              >
                <Image src={xrpLogo} alt="" h="25px" />
                <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">
                  {selectedToken?.token}
                </Text>
                <Spacer />
                <ArrowFlatRightIcon color="#D9D9D9" fontSize="2xs" />
              </HStack>
              {!hideAmount && (
                <Input
                  placeholder="0"
                  value={amount}
                  onChange={(e: any) =>
                    e.target.value.match(numbersOnlyRegex) && handleAmount(e.target.value)
                  }
                  h="100%"
                  w="50%"
                  textAlign="right"
                  fontSize="sm"
                  border="none"
                />
              )}
            </MotionBox>
          )}
        </AnimatePresence>

        <Box pos="absolute" w="100%" px="inherit" left={0} bottom={0}>
          <Button
            w="100%"
            h="40px"
            bg="secondary"
            color="textDark"
            isDisabled={hideAmount ? false : showTokenList || !amount}
            onClick={handleConfirmClick}
          >
            confirm
          </Button>
        </Box>
      </Box>
    </MotionBox>
  );
}

export default SelectTokenAmountModal;
