import ArrowLeftIcon from "@/icons/arrow-left";
import MyrkleLogoIcon from "@/icons/logo";
import { Box, HStack, Input, SimpleGrid, Text } from "@chakra-ui/react";
import TextButtonHStack from "../text-button-hstack";
import LoginButtonText from "../login-button-text";

export interface ImportSecretNumbersProps {
  handleBackArrowClick: () => void;
  handleLoginClick: () => void;
}

function ImportSecretNumbers({ handleBackArrowClick, handleLoginClick }: ImportSecretNumbersProps) {
  return (
    <Box pos="absolute" top="50%" transform="translateY(-50%)">
      <HStack>
        <ArrowLeftIcon cursor="pointer" onClick={handleBackArrowClick} />
        <MyrkleLogoIcon fontSize="80px" ml={3} />
      </HStack>
      <Box mt={-3} bg="secondary" w="250px" h="250px" borderRadius="15px" p="20px 25px">
        <Text fontSize="sm" fontWeight="bold" mb={4}>
          secret numbers
        </Text>
        <SimpleGrid columns={2} spacing={7}>
          <Box>
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <Input
                  key={i}
                  h="30px"
                  variant="flushed"
                  focusBorderColor="gray"
                  fontSize="xs"
                  color="textDark"
                  borderBottom="1px solid"
                  borderColor="textDark"
                  mb={1.5}
                  pb={2}
                />
              ))}
          </Box>
          <Box>
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <Input
                  key={i}
                  h="30px"
                  variant="flushed"
                  focusBorderColor="gray"
                  fontSize="xs"
                  color="textDark"
                  borderBottom="1px solid"
                  borderColor="textDark"
                  mb={1.5}
                  pb={2}
                />
              ))}
          </Box>
        </SimpleGrid>
      </Box>

      <TextButtonHStack text="verify my secret numbers" btnWidth="60px" btnFontSize="xs" />
      <LoginButtonText handleLoginClick={handleLoginClick} pl={0} mt={2} />
    </Box>
  );
}

export default ImportSecretNumbers;
