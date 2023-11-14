import Button from "@/components/button";
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
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import xrpLogo from "@/assets/xrp-logo.svg";
import Skeleton1 from "@/components/skeleton";
import { useLazyGenerateConditionFulfillmentQuery } from "@/features/shared/redux/xrp.api";
import ItemLabel from "@/components/item-label";
import ToastElement from "@/components/toast-element";
import CopyIcon from "@/icons/copy";

export interface AddressModalProps {
  handleClose: () => void;
  generatedEscrowData: any;
  handleGeneratedEscrowData: (data: any) => void;
}

function GenerateProtedtedEscrowModal({
  handleClose,
  generatedEscrowData,
  handleGeneratedEscrowData,
}: AddressModalProps) {
  const ref = useRef(null);

  const [generateProtectedEscrow, { isLoading }] = useLazyGenerateConditionFulfillmentQuery();

  const toast = useToast({
    position: "top",
    containerStyle: {
      ml: "400px",
      width: "200px",
    },
  });

  useOutsideClick({
    ref,
    handler: handleClose,
  });

  const handleClick = () => {
    if (!generatedEscrowData) {
      generateProtectedEscrow({})
        .unwrap()
        .then((res) => handleGeneratedEscrowData(res));
    } else {
      handleClose();
    }
  };

  const handleCopyProtectedEscrowData = () => {
    navigator.clipboard?.writeText(generatedEscrowData?.condition);

    toast({
      render: () => <ToastElement />,
    });
  };

  return (
    <MotionBox
      ref={ref}
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      w="300px"
      p={4}
      bg="darker"
      borderRadius="30px"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        height: !generatedEscrowData ? 350 : 275,
        transition: { duration: 0.5 },
      }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Flex justify="flex-end">
        <CloseButton onClick={handleClose} />
      </Flex>
      <Box px={4} mt={1}>
        <Text fontSize="lg" fontWeight="bold" mb={6} lineHeight={1.2}>
          {!generatedEscrowData ? "Generating a protected Escrow" : "Generated successfully"}
        </Text>

        {!generatedEscrowData && (
          <>
            <Text fontSize="xs" fontWeight="bold" mb={"20px"}>
              Are you sure you want to proceed?
            </Text>
            <Skeleton1 borderRadius={0} h="50px" mb={5} />

            <HStack mb={4}>
              <Text fontSize="xs">Transaction fee</Text>
              <Spacer />
              <Image src={xrpLogo} alt="logo" h="13px" />
              <Text fontSize="xs">0.001</Text>
            </HStack>
          </>
        )}

        {generatedEscrowData && (
          <>
            <ItemLabel title="Generated escrow" color="gray" />
            <HStack
              bg="dark"
              mt={3}
              mb={5}
              py={2}
              px={4}
              borderRadius="10px"
              cursor="pointer"
              onClick={handleCopyProtectedEscrowData}
            >
              <Text letterSpacing={2}>
                {generatedEscrowData?.condition?.slice(0, 4)}****************
              </Text>
              <Spacer />
              <CopyIcon fill="none" />
            </HStack>
          </>
        )}

        <Button
          w="100%"
          h="40px"
          _hover={{ bg: "primary" }}
          zIndex={500}
          isLoading={isLoading}
          onClick={handleClick}
        >
          {generatedEscrowData ? "continue" : "confirm"}
        </Button>
      </Box>
    </MotionBox>
  );
}

export default GenerateProtedtedEscrowModal;
