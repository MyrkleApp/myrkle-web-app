import Button from "@/components/button";
import ArrowLeftIcon from "@/icons/arrow-left";
import MyrkleLogoIcon from "@/icons/logo";
import { Box, HStack, Input, SimpleGrid, Spacer, Text } from "@chakra-ui/react";
import TextButtonHStack from "../text-button-hstack";
import LoginButtonText from "../login-button-text";

export interface ImportMnemonicProps {
  handleBackArrowClick: () => void;
  handleLoginClick: () => void;
}

function ImportMnemonic({ handleBackArrowClick, handleLoginClick }: ImportMnemonicProps) {
  return (
    <Box pos="absolute" top="50%" transform="translateY(-50%)">
      <HStack>
        <ArrowLeftIcon cursor="pointer" onClick={handleBackArrowClick} />
        <MyrkleLogoIcon fontSize="80px" ml={3} />
        <Spacer />
        <Button h="27px" p="7px 12px" bg="primary" borderRadius="5px" _hover={{ bg: "primary" }}>
          paste
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
                <HStack key={i} borderBottom="1px solid" borderColor="textDark" mb={1} pb="1.5px">
                  <Text fontSize="xs" color="textDark" borderColor="textDark">
                    {i + 1}
                  </Text>
                  <Input variant="unstyled" fontSize="xs" color="textDark" m={0} p={0} />
                </HStack>
              ))}
          </Box>
          <Box>
            {Array(12)
              .fill(null)
              .map((_, i) => (
                <HStack key={i} borderBottom="1px solid" borderColor="textDark" mb={1} pb="1.5px">
                  <Text fontSize="xs" color="textDark" borderColor="textDark">
                    {i + 13}
                  </Text>
                  <Input variant="unstyled" fontSize="xs" color="textDark" m={0} p={0} />
                </HStack>
              ))}
          </Box>
        </SimpleGrid>
      </Box>

      <TextButtonHStack text="verify my passphrase" />
      <LoginButtonText handleLoginClick={handleLoginClick} pl={0} mt={2} />
    </Box>
  );
}

export default ImportMnemonic;
