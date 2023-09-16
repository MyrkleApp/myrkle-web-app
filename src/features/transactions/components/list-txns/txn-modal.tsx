import Button from "@/components/button";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Spacer,
  Switch,
  Text,
  useOutsideClick,
} from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import { useRef, useState } from "react";
import ItemLabel from "@/components/item-label";
import { MotionBox } from "@/components/motion-elements";
import ArrowLeftIcon from "@/icons/arrow-left";
import { AnimatePresence } from "framer-motion";
import ArrowRightFlatIcon from "@/icons/arrow-right-flat";

export interface TxnModalProps {
  handleClose: () => void;
}

function TxnModal({ handleClose }: TxnModalProps) {
  const [isFlagView, setFlagView] = useState(false);

  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: handleClose,
  });

  return (
    <Flex
      ref={ref}
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      w="700px"
      h="470px"
      maxH="100%"
      overflow="hidden auto"
      bg="darker"
      p={5}
      borderRadius="20px"
      gap="30px"
    >
      <Box w="50%">
        <Button
          className="font-face-proxima-nova-black"
          w="100%"
          h="35px"
          fontWeight="bold"
          mb={7}
          leftIcon={<ArrowLeftIcon ml="-70px" />}
        >
          Transaction Detail
        </Button>
        <HStack px={4} bg="darkest" borderRadius="10px" mb={4}>
          <Image src={xrpLogo} alt="" h="30px" />
          <Spacer />
          <Text className="font-face-proxima-nova-black" fontSize="3xl">
            300.00
          </Text>
        </HStack>
        <Box px={4} py="2px" bg="dark" borderRadius="10px" mb={2}>
          <ItemLabel title="Index" fontSize="2xs" mb={0} />
          <Text fontSize="sm">sEdT1DxxEcgsR3FfcWrYGdHJHjKmBBT</Text>
        </Box>
        <Box px={4} py="2px" bg="dark" borderRadius="10px" mb={2}>
          <ItemLabel title="Transaction ID" fontSize="2xs" mb={0} />
          <Text fontSize="sm">sEdT1DxxEcgsR3FfcWrYGdHJHjKmBBT</Text>
        </Box>
        <Box px={4} py="2px" bg="dark" borderRadius="10px" mb={2} pos="relative">
          <ItemLabel title="Sender" fontSize="2xs" mb={0} />
          <Text fontSize="sm">sEdT1DxxEcgsR3FfcWrYGdHJHjKmBBT</Text>
          <Box w="5px" h="20px" bg="danger" pos="absolute" left={0} top={0} mt="14px" />
        </Box>
        <Box px={4} py="2px" bg="dark" borderRadius="10px" mb={7} pos="relative">
          <ItemLabel title="Receiver" fontSize="2xs" mb={0} />
          <Text fontSize="sm">sEdT1DxxEcgsR3FfcWrYGdHJHjKmBBT</Text>
          <Box w="5px" h="20px" bg="primary" pos="absolute" left={0} top={0} mt="14px" />
        </Box>
        <Button
          w="100%"
          textAlign="left"
          justifyContent="space-between"
          onClick={() => setFlagView(true)}
          rightIcon={<ArrowRightFlatIcon fontSize="xs" />}
        >
          View Flags
        </Button>
      </Box>

      <Box w="50%" pos="relative">
        <AnimatePresence>
          {isFlagView && (
            <MotionBox
              pos="absolute"
              mt="3px"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
            >
              <IconButton
                size="xs"
                isRound
                bg="primary"
                aria-label={"back"}
                onClick={() => setFlagView(false)}
              >
                <ArrowLeftIcon />
              </IconButton>
            </MotionBox>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!isFlagView && (
            <MotionBox
              w="100%"
              h="270px"
              pos="absolute"
              top="62px"
              bg="#292929"
              borderRadius="15px"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Box
                w="60%"
                h="calc(100% - 20px)"
                pos="absolute"
                top="10px"
                right="10px"
                bg="dark"
                borderRadius="15px"
              />
            </MotionBox>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isFlagView && (
            <MotionBox
              mt="58px"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HStack mb={2}>
                <Text color="textDark" fontWeight="bold" fontSize="xs">
                  tfNoDirectRipple
                </Text>
                <Spacer />
                <Switch size="sm" colorScheme="whatsapp" />
              </HStack>
              <Text
                color="textDark"
                fontSize="xs"
                pb={2}
                mb={3}
                borderBottom="1px solid #525151"
                lineHeight={1.4}
              >
                Do not use the default path; only use paths included in the Paths field. This is
                intended to force the transaction to take arbitrage opportunities. Most clients do
                not need this.
              </Text>

              <HStack mb={2}>
                <Text color="textDark" fontWeight="bold" fontSize="xs">
                  tfPartialPayment
                </Text>
                <Spacer />
                <Switch size="sm" colorScheme="whatsapp" />
              </HStack>
              <Text
                color="textDark"
                fontSize="xs"
                pb={2}
                mb={3}
                borderBottom="1px solid #525151"
                lineHeight={1.4}
              >
                If the specified Amount cannot be sent without spending more than SendMax, reduce
                the received amount instead of failing outright. See Partial Payments for more
                details.
              </Text>

              <HStack mb={2}>
                <Text color="textDark" fontWeight="bold" fontSize="xs">
                  tfLimitQuality
                </Text>
                <Spacer />
                <Switch size="sm" colorScheme="whatsapp" />
              </HStack>
              <Text color="textDark" fontSize="xs" pb={2} lineHeight={1.4}>
                Only take paths where all the conversions have an input:output ratio that is equal
                or better than the ratio of Amount:SendMax. See Limit Quality for details.
              </Text>
            </MotionBox>
          )}
        </AnimatePresence>

        <Button w="100%" pos="absolute" bottom="28px">
          View Block in Explorer
        </Button>
      </Box>
    </Flex>
  );
}

export default TxnModal;
