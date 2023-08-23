import { MotionBox } from "@/components/motion-elements";
import {
  Box,
  Circle,
  CloseButton,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  Switch,
  Text,
  VStack,
  useOutsideClick,
} from "@chakra-ui/react";
import { useRef } from "react";
import xrpLogo from "@/assets/xrp-logo.svg";
import ArrowDownIcon from "@/icons/arrow-down";
import ArrowUpIcon from "@/icons/arrow-up";
import ChecksIcon from "@/icons/checks";
import ExchangeIcon from "@/icons/exchange";
import HourGlassIcon from "@/icons/hour-glass";
import CancelIcon from "@/icons/cancel";

export interface TokenCardModalProps {
  handleClose: () => void;
}

function TokenCardModal({ handleClose }: TokenCardModalProps) {
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
      h="92%"
      w="850px"
      p={8}
      pt={2}
      bg="darker"
      borderRadius="30px"
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1, transition: { duration: 0.5 } }}
      // exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Flex justify="flex-end" mb="10px">
        <CloseButton onClick={handleClose} mr={-2} />
      </Flex>

      <SimpleGrid columns={2} h="calc(100% - 50px)" spacing="10px">
        <Flex direction="column" justify="space-between">
          <HStack mb={"1%"}>
            <HStack>
              <Image src={xrpLogo} alt="logo" />
              <VStack align="flex-start" spacing="0">
                <Text fontWeight="bold" fontSize="md" textTransform="uppercase">
                  xrpl
                </Text>
                <Text fontSize="2xs" mt="-2px" color="danger">
                  -0.02%
                </Text>
              </VStack>
            </HStack>

            <Spacer />

            <VStack align="flex-end" spacing="0">
              <Text fontWeight="bold" fontSize="2xl" textTransform="uppercase">
                234.9
              </Text>
              <Text fontSize="sm" fontWeight="bold" mt="-2px" color="textDark">
                $575,234.9
              </Text>
            </VStack>
          </HStack>

          <HStack mb={"0.5%"}>
            <Text fontSize="sm" fontWeight="bold">
              Ripple
            </Text>
            <Switch colorScheme="whatsapp" />
          </HStack>

          <Box mb={"1%"}>
            <HStack mb={2}>
              <Text fontWeight="bold" fontSize="2.3vh">
                Index
              </Text>
              {/* info popup here */}
            </HStack>

            <Box bg="dark" borderRadius="12px" p={4} boxShadow="0 2px 8px #00000040">
              <Text fontWeight="bold" fontSize="sm">
                sEdT1DxxEcgsR3FfcWrYGdHJHjKmBBT
              </Text>
            </Box>
          </Box>

          <Box h="55%" mt="-4px">
            <HStack mb={2}>
              <Text fontWeight="bold" fontSize="2.3vh">
                Description
              </Text>
              {/* info popup here */}
            </HStack>

            <Box
              bg="dark"
              h="calc(100% - 30px)"
              borderRadius="12px"
              p={4}
              boxShadow="0 2px 8px #00000040"
            >
              <Box h="95%" mt="10px" overflow="hidden auto">
                <Text fontWeight="" fontSize="sm" maxW="calc(100% - 20px)">
                  Lorem ipsum dolor sit amet consectetur. Risus neque pellentesque neque molestie
                  pretium viverra. Libero vulputate lobortis pulvinar mauris vel sodales. Sed diam
                  non dolor ut donec magna bibendum nascetur. Urna volutpat velit molestie placerat.
                  Lorem ipsum dolor sit amet consectetur. Risus neque pellentesque neque molestie
                  pretium viverr.
                </Text>
              </Box>
            </Box>
          </Box>
        </Flex>

        <Flex direction="column" justify="space-between">
          <Flex justify="space-between">
            <Circle bg="secondary" size="50px">
              <ChecksIcon stroke="textDark" fontSize="lg" />
            </Circle>
            <Circle bg="secondary" size="50px">
              <HourGlassIcon color="textDark" fill="textDark" fontSize="lg" />
            </Circle>
            <Circle bg="secondary" size="50px">
              <ArrowUpIcon stroke="textDark" fontSize="lg" />
            </Circle>
            <Circle bg="secondary" size="50px">
              <ArrowDownIcon stroke="textDark" fontSize="lg" />
            </Circle>
            <Circle bg="secondary" size="50px">
              <ExchangeIcon stroke="textDark" fill="none" fontSize="lg" />
            </Circle>
          </Flex>

          <SimpleGrid columns={4} h="100px" spacing={3} mb={2}>
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <VStack
                  key={i}
                  bg="dark"
                  borderRadius="12px"
                  pt={6}
                  spacing={5}
                  boxShadow="0 2px 8px #00000040"
                >
                  <Text fontSize="md">63</Text>
                  <Text fontSize="2xs">Object Count</Text>
                </VStack>
              ))}
            <VStack
              bg="dark"
              borderRadius="12px"
              pt={6}
              spacing={3}
              boxShadow="0 2px 8px #00000040"
              cursor="pointer"
              _hover={{ bg: "danger" }}
            >
              <CancelIcon fontSize="3xl" />
              <Text fontSize="2xs">Object Count</Text>
            </VStack>
          </SimpleGrid>

          <Box bg="dark" h="55%" borderRadius="12px" boxShadow="0 2px 8px #00000040" pos="relative">
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
        </Flex>
      </SimpleGrid>
    </MotionBox>
  );
}

export default TokenCardModal;
