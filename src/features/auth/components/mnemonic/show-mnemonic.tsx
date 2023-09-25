import Button from "@/components/button";
import ArrowLeftIcon from "@/icons/arrow-left";
import MyrkleLogoIcon from "@/icons/logo";
import { Box, HStack, SimpleGrid, Spacer, Text } from "@chakra-ui/react";
import TextButtonHStack from "../text-button-hstack";
import LoginButtonText from "../login-button-text";

export interface ShowMnemonicProps {
  handleBackArrowClick: () => void;
  handleLoginClick: () => void;
}

function ShowMnemonic({ handleBackArrowClick, handleLoginClick }: ShowMnemonicProps) {
  return (
    <Box pos="absolute" top="50%" transform="translateY(-50%)">
      <HStack>
        <ArrowLeftIcon cursor="pointer" onClick={handleBackArrowClick} />
        <MyrkleLogoIcon fontSize="80px" ml={3} />
        <Spacer />
        <Button h="27px" p="7px 12px" bg="primary" borderRadius="5px" _hover={{ bg: "primary" }}>
          copy
        </Button>
      </HStack>
      <Box mt={-3} bg="secondary" w="400px" h="400px" borderRadius="15px" p="15px 20px">
        <Text fontSize="sm" fontWeight="bold" mb={2}>
          mnemonic
        </Text>
        <SimpleGrid columns={2} spacing={7}>
          <Box>
            {Array(12)
              .fill(null)
              .map((_, i) => (
                <Text
                  key={i}
                  fontSize="xs"
                  color="textDark"
                  borderBottom="1px solid"
                  borderColor="textDark"
                  mb={1}
                  pb={1}
                >
                  mnemonic
                </Text>
              ))}
          </Box>
          <Box>
            {Array(12)
              .fill(null)
              .map((_, i) => (
                <Text
                  key={i}
                  fontSize="xs"
                  color="textDark"
                  borderBottom="1px solid"
                  borderColor="textDark"
                  mb={1}
                  pb={1}
                >
                  mnemonic
                </Text>
              ))}
          </Box>
        </SimpleGrid>
      </Box>

      <TextButtonHStack text="I have backed up my mnemonic" />
      <LoginButtonText handleLoginClick={handleLoginClick} pl={0} mt={2} />
    </Box>
  );
}

export default ShowMnemonic;
