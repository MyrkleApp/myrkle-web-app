import Button from "@/components/button";
import ArrowLeftIcon from "@/icons/arrow-left";
import MyrkleLogoIcon from "@/icons/logo";
import { Box, HStack, SimpleGrid, Spacer, Text } from "@chakra-ui/react";
import TextButtonHStack from "../text-button-hstack";
import LoginButtonText from "../login-button-text";

export interface ShowSecretNumbersProps {
  handleBackArrowClick: () => void;
  handleLoginClick: () => void;
}

function ShowSecretNumbers({ handleBackArrowClick, handleLoginClick }: ShowSecretNumbersProps) {
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
      <Box mt={-3} bg="secondary" w="250px" h="250px" borderRadius="15px" p="20px 25px">
        <Text fontSize="sm" fontWeight="bold" mb={4}>
          secret numbers
        </Text>
        <SimpleGrid columns={2} spacing={7}>
          <Box>
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <Text
                  key={i}
                  fontSize="xs"
                  color="textDark"
                  borderBottom="1px solid"
                  borderColor="textDark"
                  mb={3}
                  pb={2}
                >
                  031847
                </Text>
              ))}
          </Box>
          <Box>
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <Text
                  key={i}
                  fontSize="xs"
                  color="textDark"
                  borderBottom="1px solid"
                  borderColor="textDark"
                  mb={3}
                  pb={2}
                >
                  031847
                </Text>
              ))}
          </Box>
        </SimpleGrid>
      </Box>

      <TextButtonHStack text="I've verified my secret numbers" btnWidth="60px" btnFontSize="xs" />
      <LoginButtonText handleLoginClick={handleLoginClick} pl={0} mt={2} />
    </Box>
  );
}

export default ShowSecretNumbers;
