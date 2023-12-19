import Button from "@/components/button";
import Input from "@/components/input";
import { MotionBox } from "@/components/motion-elements";
import { useGenerateXAddressMutation } from "@/features/shared/redux/xrp.api";
import { Box, CloseButton, Flex, HStack, Text, useOutsideClick, useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectAddress, selectNetwork } from "../../redux/wallet.selectors";
import ToastElement from "@/components/toast-element";
import { numbersOnlyRegex } from "@/constants";

export interface XAddressFormModalProps {
  handleClose: () => void;
}

function XAddressFormModal({ handleClose }: XAddressFormModalProps) {
  const ref = useRef(null);

  const toast = useToast({
    position: "top",
    containerStyle: {
      ml: "400px",
      width: "200px",
    },
  });

  const address = useSelector(selectAddress);
  const network = useSelector(selectNetwork);

  const [tag, setTag] = useState("");

  const [generateXAddress, { isLoading, data }] = useGenerateXAddressMutation();

  useOutsideClick({
    ref,
    handler: handleClose,
  });

  const handleSubmit = () => {
    generateXAddress({
      wallet_address: address,
      tag,
      is_testnet: network === "testnet",
    });
  };

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(data);

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
      h={data ? "150px" : "200px"}
      w="270px"
      p={4}
      bg="darker"
      borderRadius="30px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Flex justify="flex-end">
        <CloseButton onClick={handleClose} />
      </Flex>
      <Box px={6} mt={1}>
        {data ? (
          <>
            <Box
              bg="secondary"
              borderRadius="5px"
              py={1}
              px={2}
              mb={1}
              cursor="pointer"
              onClick={handleCopyAddress}
            >
              <Text fontSize="2xs" color="textDark" fontWeight="bold">
                {data}
              </Text>
            </Box>
            <Text fontSize="2xs" color="textDark" textAlign="center" mb={4}>
              click to copy x address
            </Text>
          </>
        ) : (
          <>
            <HStack mb={1}>
              <Text fontSize="2xs" color="textDark" fontWeight="bold">
                Destination tag
              </Text>
            </HStack>

            <Input
              mb={2}
              value={tag}
              onChange={(e: any) =>
                e.target.value.match(numbersOnlyRegex) && setTag(e.target.value)
              }
            />

            <Button
              w="100%"
              h="40px"
              bg={tag.trim().length ? "primary" : "secondary"}
              color="textDark"
              isLoading={isLoading}
              onClick={handleSubmit}
            >
              confirm
            </Button>
          </>
        )}
      </Box>
    </MotionBox>
  );
}

export default XAddressFormModal;
