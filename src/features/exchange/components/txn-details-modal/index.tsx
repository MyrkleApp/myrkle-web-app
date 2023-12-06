import Button from "@/components/button";
import { Box, CloseButton, Flex, HStack, Spacer, Text, useOutsideClick } from "@chakra-ui/react";
import { useRef } from "react";
import TokenItem from "./token-item";
import { ellipsisAtCenter } from "@/helpers";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";
import { useSelector } from "react-redux";

export interface TxnDetailsModalProps {
  fromTokenName: string;
  fromTokenIssuer: string;
  fromTokenIcon: string;
  fromTokenAmount: number | string;
  toTokenName: string;
  toTokenIssuer: string;
  toTokenIcon: string;
  toTokenAmount: number | string;
  handleClose: () => void;
  handleProceed?: () => void;
  proceedText?: string;
  offerId?: string;
  creator?: string;
  title?: string;
  sequence?: string | number;
}

function TxnDetailsModal({
  fromTokenName,
  fromTokenIssuer,
  fromTokenIcon,
  fromTokenAmount,
  toTokenName,
  toTokenIssuer,
  toTokenIcon,
  toTokenAmount,
  handleClose,
  handleProceed,
  proceedText,
  title,
  // offerId,
  creator, // sequence,
}: TxnDetailsModalProps) {
  const ref = useRef(null);

  const address = useSelector(selectAddress);

  const isCreateOffer = title?.toLowerCase().includes("create");
  const isMatchOffer = title?.toLowerCase().includes("match");
  const isCancelOffer = title?.toLowerCase().includes("cancel");

  useOutsideClick({
    ref,
    handler: handleClose,
  });

  return (
    <Flex
      ref={ref}
      justify="center"
      align="center"
      h="100%"
      aspectRatio={1.1 / 1.5}
      bg="darker"
      borderRadius="15px"
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <Box w="calc(100% - 60px)" h="calc(100% - 80px)" pos="relative">
        <HStack>
          <Text fontWeight="bold" textTransform="capitalize">
            {title || ""}
          </Text>
          <Spacer />
          <CloseButton onClick={handleClose} />
        </HStack>

        <Text color="textDark" fontSize="xs" fontWeight="bold" pos="absolute" top="10%">
          Give
        </Text>
        <Box pos="absolute" top="calc(10% + 25px)" w="100%" h="15%">
          <TokenItem
            token={fromTokenName}
            issuer={fromTokenIssuer}
            icon={fromTokenIcon}
            amount={fromTokenAmount}
          />
        </Box>

        <Text color="textDark" fontSize="xs" fontWeight="bold" pos="absolute" top="33%">
          Get
        </Text>
        <Box pos="absolute" top="calc(33% + 25px)" w="100%" h="15%">
          <TokenItem
            token={toTokenName}
            issuer={toTokenIssuer}
            icon={toTokenIcon}
            amount={toTokenAmount}
          />
        </Box>

        <Flex
          direction="column"
          justify="space-between"
          pos="absolute"
          top="calc(58%)"
          w="100%"
          h="20%"
        >
          <HStack>
            <Text fontSize="2.2vh">Transaction type</Text>
            <Spacer />
            <Text fontSize="2vh" fontWeight="bold">
              {isCreateOffer ? "Offer Create" : isMatchOffer ? "Offer Match" : "Offer Cancel"}
            </Text>
          </HStack>
          <HStack>
            <Text fontSize="2.2vh">Creator</Text>
            <Spacer />
            <Text fontSize="2vh" fontWeight="bold">
              {isCreateOffer
                ? ellipsisAtCenter(address)
                : isCancelOffer
                ? ellipsisAtCenter(address)
                : ellipsisAtCenter(creator || "") || "-- --"}
            </Text>
          </HStack>
          <HStack>
            <Text fontSize="2.2vh">Rate</Text>
            <Spacer />
            <Text fontSize="2vh" fontWeight="bold">
              {Number(fromTokenAmount) / Number(toTokenAmount) || "-- --"}
            </Text>
          </HStack>
        </Flex>

        <Flex direction="column" align="center" justify="center" pos="absolute" bottom="0" w="100%">
          <Text fontSize="2.2vh" mb={3}>
            {proceedText || "Do you want to proceed?"}
          </Text>
          <Button w="80%" h="7vh" letterSpacing={1} onClick={handleProceed}>
            Proceed
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}

export default TxnDetailsModal;
