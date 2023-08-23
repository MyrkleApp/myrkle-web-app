import { MotionBox } from "@/components/motion-elements";
import PlusIcon from "@/icons/plus";
import {
  Box,
  CloseButton,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
  useOutsideClick,
} from "@chakra-ui/react";
import { useRef } from "react";
import xrpLogo from "@/assets/xrp-logo.svg";
import FlagIcon from "@/icons/flag";
import RemoveAccountIcon from "@/icons/remove-account";

export interface AccountInfoModalProps {
  handleClose: () => void;
}

function AccountInfoModal({ handleClose }: AccountInfoModalProps) {
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
      h="450px"
      w="820px"
      p={8}
      // pt={8}
      // px={8}
      // pb={6}
      bg="darker"
      borderRadius="30px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Flex justify="space-between" mb="7%">
        <HStack>
          <Text fontWeight="bold" fontSize="2xl">
            Account Info
          </Text>
          <HStack bg="dark" boxShadow="0 2px 3px #121312" py={1} px={2} borderRadius="5px">
            <PlusIcon fontSize="2xs" />
            <Text fontWeight="bold" fontSize="xs">
              add account
            </Text>
          </HStack>
        </HStack>
        <CloseButton onClick={handleClose} />
      </Flex>

      <SimpleGrid columns={2} h="280px" spacing="10px">
        <Flex direction="column" justify="space-between" border="1px solid transparent">
          <Box>
            <HStack>
              <Text fontWeight="bold" fontSize="sm">
                Index
              </Text>
              {/* info popup here */}
            </HStack>
          </Box>

          <Box bg="dark" borderRadius="12px" p={4} boxShadow="0 2px 8px #00000040">
            <Text fontWeight="bold" fontSize="sm">
              sEdT1DxxEcgsR3FfcWrYGdHJHjKmBBT
            </Text>
          </Box>

          <HStack spacing="10px">
            <HStack bg="dark" borderRadius="12px" p={4} w="60%" boxShadow="0 2px 8px #00000040">
              <Image src={xrpLogo} alt="logo" />
              <VStack align="flex-start" spacing="0">
                <Text fontWeight="bold" fontSize="2xl">
                  5,004.00
                </Text>
                <HStack mt="-5px">
                  <Text fontSize="2xs">Spendable balance</Text>
                  {/* info popup here */}
                </HStack>
              </VStack>
            </HStack>

            <VStack
              align="flex-start"
              bg="dark"
              borderRadius="12px"
              p={4}
              pl={4}
              w="40%"
              spacing="0"
              boxShadow="0 2px 8px #00000040"
            >
              <Text fontWeight="bold" fontSize="2xl">
                $1,506.00
              </Text>
              <HStack mt="-5px">
                <Text fontSize="2xs">Spendable balance</Text>
                {/* info popup here */}
              </HStack>
            </VStack>
          </HStack>

          <SimpleGrid columns={4} h="90px" spacing={2}>
            <VStack
              bg="dark"
              borderRadius="12px"
              pt={4}
              spacing={4}
              boxShadow="0 2px 8px #00000040"
            >
              <Text fontSize="2xl">63</Text>
              <Text fontSize="2xs">Object Count</Text>
            </VStack>

            <VStack
              bg="dark"
              borderRadius="12px"
              pt={4}
              spacing={4}
              boxShadow="0 2px 8px #00000040"
            >
              <Text fontSize="2xl">15</Text>
              <Text fontSize="2xs">Tick size</Text>
            </VStack>

            <VStack
              bg="dark"
              borderRadius="12px"
              pt={4}
              spacing="12px"
              boxShadow="0 2px 8px #00000040"
            >
              <FlagIcon fontSize="2xl" />
              <Text fontSize="2xs" textAlign="center" maxW="70%">
                Account Root Flags
              </Text>
            </VStack>

            <VStack
              bg="#FF00008C"
              borderRadius="12px"
              pt={4}
              spacing="12px"
              boxShadow="0 2px 8px #00000040"
            >
              <RemoveAccountIcon fontSize="2xl" />
              <Text fontSize="2xs" textAlign="center" maxW="70%">
                Remove Account
              </Text>
            </VStack>
          </SimpleGrid>
        </Flex>

        <Box bg="dark" borderRadius="12px" boxShadow="0 2px 8px #00000040" pos="relative">
          <Box
            bg="#5757573B"
            h="calc(100% - 20px)"
            w="55%"
            borderRadius="12px"
            pos="absolute"
            top="10px"
            right="10px"
          />
        </Box>
      </SimpleGrid>
    </MotionBox>
  );
}

export default AccountInfoModal;
