import { MotionBox } from "@/components/motion-elements";
import { Box, CloseButton, Flex, Image, SimpleGrid, Text, useOutsideClick } from "@chakra-ui/react";
import { useRef } from "react";
import Skeleton1 from "./skeleton";

export interface ConnectXummModalProps {
  handleClose: () => void;
  qrCodeImage: string;
}

function ConnectXummModal({ handleClose, qrCodeImage }: ConnectXummModalProps) {
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
      h="330px"
      w="550px"
      p={4}
      bg="darker"
      borderRadius="15px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Flex justify="space-between" px={3}>
        <Text fontWeight="bold">Connect xumm</Text>
        <CloseButton onClick={handleClose} />
      </Flex>
      <SimpleGrid columns={2} spacing={3} px={3} mt={3} h="calc(100% - 60px)">
        <Box>
          <Text fontSize="xs">Lorem ipsum dolor sit amet, consectetur adipis</Text>
        </Box>

        {qrCodeImage ? (
          <Flex
            justify="center"
            align="center "
            bg="#fff"
            border="2px solid"
            borderColor="success"
            borderRadius="10px"
            h="100%"
            p={2}
          >
            <Image src={qrCodeImage} alt="connect xumm" />
          </Flex>
        ) : (
          <Skeleton1 borderRadius="0" h="100%" />
        )}
      </SimpleGrid>
    </MotionBox>
  );
}

export default ConnectXummModal;
