import { MotionBox } from "@/components/motion-elements";
import CopyIcon from "@/icons/copy";
import { Box, CloseButton, Flex, HStack, Spacer, Text, useDisclosure } from "@chakra-ui/react";

export interface WalletAccordionProps {
  wallet: React.ReactNode;
  [anyProp: string]: any;
}

function WalletAccordion({ wallet, ...props }: WalletAccordionProps) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <MotionBox
      bg="darker"
      borderRadius="30px"
      cursor="pointer"
      pos="relative"
      overflow="hidden"
      onClick={onToggle}
      initial={{ height: 80 }}
      animate={{ height: isOpen ? 170 : 80 }}
      {...props}
    >
      <Flex align="center" h="80px" p="25px 35px">
        {wallet}
      </Flex>

      <Box as="hr" borderTop="1px solid gray" w="calc(100% - 70px)" mx="auto" mb={2} />

      <Box w="calc(100% - 70px)" mx="auto">
        <HStack mb={2}>
          <Text fontSize="xs" fontWeight="bold">
            Main surfer
          </Text>
          <Spacer />
          <Box bg="darkest" p="0 5px" borderRadius="4px">
            <CopyIcon fill="none" fontSize="sm" />
          </Box>
          <CloseButton bg="darkest" size="sm" />
        </HStack>

        <Text fontSize="xs" color="textDark">
          lorem ipsum dolor sit amet, consectetur adipis
        </Text>
      </Box>
    </MotionBox>
  );
}

export default WalletAccordion;
