import Button from "@/components/button";
import Input from "@/components/input";
import { Box, Flex, HStack, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import ProceedModal from "@/features/shared/components/proceed-modal";
import Backdrop from "@/components/backdrop";
// import { useCreateTokenMutation } from "@/features/shared/redux/xrp.api";

// export interface MintTokenForm {
//   handleConfirmClick: () => void;
// }

const getTickSize = (i: number) => (i <= 0 ? 0 : i + 2);

function MintTokenForm() {
  const { isOpen: isProceedOpen, onOpen: onOpenProceed, onClose: onCloseProceed } = useDisclosure();

  const [tickSize, setTickSize] = useState<null | number>(null);

  // const [createToken, { isLoading: isCreateTokenLoading }] = useCreateTokenMutation()

  const handleConfirmClick = () => {
    onOpenProceed();
  };

  const handleCreateToken = () => {
    // createToken({
    //   issuer_addr:
    // })
  };

  return (
    <>
      <Flex direction="column" justify="space-between" minH="100%" pr={2}>
        <Box>
          <HStack mb={2}>
            <Text fontSize="xs" fontWeight="bold">
              Token name
            </Text>
          </HStack>
          <Input mb={5} />

          <HStack mb={2}>
            <Text fontSize="xs" fontWeight="bold">
              Amount
            </Text>
          </HStack>
          <Input mb={5} />

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
                  bg={tickSize === i + 1 ? "primary" : "#585858"}
                  borderRadius="5px"
                  fontSize="sm"
                  fontWeight="bold"
                  _hover={{
                    bg: tickSize === i + 1 ? "primary" : "#585858",
                  }}
                  onClick={() => setTickSize(i + 1)}
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
            {/* <PlusMinus
              value={percentage}
              handlePlusClick={handlePlusClick}
              handleMinusClick={handleMinusClick}
              handleInputChange={handleInputChange}
            /> */}

            <Text fontSize="sm" fontWeight="bold">
              put back the plus minus component here %
            </Text>
          </HStack>

          <HStack mb={2}>
            <Text fontSize="xs" fontWeight="bold">
              Domain
            </Text>
          </HStack>
          <Input mb={10} />
        </Box>

        <Box>
          <Button w="100%" onClick={handleConfirmClick}>
            confirm
          </Button>
        </Box>
      </Flex>

      <Backdrop isOpen={isProceedOpen}>
        <ProceedModal
          text="You are about to take a permanent step that cannot be undone."
          isLoading={false}
          handleProceed={handleCreateToken}
          handleClose={onCloseProceed}
        />
      </Backdrop>
    </>
  );
}

export default MintTokenForm;
