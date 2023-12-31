import Button from "@/components/button";
import Input from "@/components/input";
import { Box, Flex, HStack, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import Backdrop from "@/components/backdrop";
import { numbersOnlyRegex } from "@/constants";
import PlusMinus from "../plus-minus";
import { useEffect } from "react";
import { TMintTokenStep } from "../../types";
import DialogBox from "@/components/dialog-box";
import MintTokenProgress from "./mint-token-progress";

const getTickSize = (i: number) => (i <= 0 ? 0 : i + 2);

export interface MintTokenFormProps {
  // handleConfirmClick: () => void;
  tokenName: string;
  tickSize: null | number;
  totalSupply: string;
  domain: string;
  transferFee: string;
  handleTokenName: (val: string) => void;
  handleTickSize: (val: number) => void;
  handleTotalSupply: (val: string) => void;
  handleDomain: (val: string) => void;
  handleTransferFee: (val: string) => void;
  handleMintTokenStep: (val: TMintTokenStep) => void;
}

function MintTokenForm({
  tokenName,
  tickSize,
  totalSupply,
  domain,
  transferFee,
  handleTokenName,
  handleTickSize,
  handleTotalSupply,
  handleDomain,
  handleTransferFee,
  handleMintTokenStep,
}: MintTokenFormProps) {
  const { isOpen: isWarningOpen, onOpen: onOpenWarning, onClose: onCloseWarning } = useDisclosure();

  const isDisabled = !tokenName || !totalSupply || !domain || tickSize === null || !transferFee;

  useEffect(() => {
    onOpenWarning();
  }, [onOpenWarning]);

  // ===========================================================================================
  // handlers
  // ===========================================================================================

  const handleRoyaltiesPlusIconClick = () => {
    if (Number(transferFee) >= 50) return;
    handleTransferFee(Number(Number(transferFee) + 0.01).toFixed(2));
  };

  const handleRoyaltiesMinusIconClick = () => {
    if (Number(transferFee) <= 0) return;
    handleTransferFee(Number(Number(transferFee) - 0.01).toFixed(2));
  };

  const handleRoyaltiesChange = (e: any) => {
    if (!e.target.value.match(numbersOnlyRegex)) return;
    if (Number(e.target.value) > 50) return;
    handleTransferFee(e.target.value);
  };

  const handleProceed = () => {
    handleMintTokenStep("issuer");
  };

  return (
    <>
      <MintTokenProgress currentStep={0} />
      <Flex direction="column" justify="space-between" minH="100%" pr={2}>
        <Box>
          <HStack mb={2}>
            <Text fontSize="xs" fontWeight="bold">
              Token name
            </Text>
          </HStack>
          <Input mb={5} value={tokenName} onChange={(e: any) => handleTokenName(e.target.value)} />

          <HStack mb={2}>
            <Text fontSize="xs" fontWeight="bold">
              Amount
            </Text>
          </HStack>
          <Input
            mb={10}
            value={totalSupply}
            onChange={(e: any) =>
              e.target.value.match(numbersOnlyRegex) && handleTotalSupply(e.target.value)
            }
          />

          <HStack mb={2}>
            <Text fontSize="xs" fontWeight="bold">
              Tick Size
            </Text>
          </HStack>
          <SimpleGrid
            bg="secondary"
            p={2}
            borderRadius="5px"
            columns={[6, null, null, 8]}
            spacing={2}
            mb={5}
          >
            {Array(14)
              .fill(null)
              .map((_, i) => (
                <Button
                  key={i}
                  w="100%"
                  aspectRatio={1}
                  bg={tickSize === getTickSize(i) ? "primary" : "#585858"}
                  borderRadius="5px"
                  fontSize="sm"
                  fontWeight="bold"
                  _hover={{
                    bg: tickSize === getTickSize(i) ? "primary" : "#585858",
                  }}
                  onClick={() => handleTickSize(getTickSize(i))}
                >
                  {getTickSize(i)}
                </Button>
              ))}
          </SimpleGrid>

          <HStack mb={2}>
            <Text fontSize="xs" fontWeight="bold">
              Transfer fee
            </Text>
          </HStack>
          <HStack mb={5}>
            <PlusMinus
              value={transferFee}
              handlePlusClick={handleRoyaltiesPlusIconClick}
              handleMinusClick={handleRoyaltiesMinusIconClick}
              handleInputChange={handleRoyaltiesChange}
            />
            <Text fontSize="sm" fontWeight="bold">
              %
            </Text>
          </HStack>

          <HStack mb={2}>
            <Text fontSize="xs" fontWeight="bold">
              Domain
            </Text>
          </HStack>
          <Input mb={5} value={domain} onChange={(e: any) => handleDomain(e.target.value)} />
        </Box>

        <Box>
          <Button
            w="100%"
            onClick={handleProceed}
            bg={isDisabled ? "secondary" : "primary"}
            isDisabled={isDisabled}
          >
            confirm
          </Button>
        </Box>
      </Flex>

      <Backdrop isOpen={isWarningOpen}>
        <DialogBox handleClose={onCloseWarning} w="350px" h="300px">
          <Text fontWeight="bold" fontSize="sm" mb={3}>
            NOTE:
          </Text>
          <Box as="ul">
            <Box as="li" fontSize="xs" mb={2}>
              For optimal transparency and security, avoid using your main account for both issuing
              and managing tokens. Separate accounts for each role are recommended.
            </Box>
            <Box as="li" fontSize="xs" mb={2}>
              The accounts must be activated in the ledger and have reservations for creating new
              objects
            </Box>
            <Box as="li" fontSize="xs">
              Make sure the "active" wallet shown on Myrkle is the one you're currently using in
              your wallet provider's app.
            </Box>
          </Box>
        </DialogBox>
      </Backdrop>
    </>
  );
}

export default MintTokenForm;
