import ArrowLeftIcon from "@/icons/arrow-left";
import MyrkleLogoIcon from "@/icons/logo";
import { Box, HStack, Input, Text } from "@chakra-ui/react";
import TextButtonHStack from "../text-button-hstack";
import LoginButtonText from "../login-button-text";

export interface ImportSeedProps {
  handleBackArrowClick: () => void;
  handleLoginClick: () => void;
}

function ImportSeed({ handleBackArrowClick, handleLoginClick }: ImportSeedProps) {
  return (
    <Box pos="absolute" top="50%" transform="translateY(-50%)">
      <HStack>
        <ArrowLeftIcon cursor="pointer" onClick={handleBackArrowClick} />
        <MyrkleLogoIcon fontSize="80px" ml={3} />
      </HStack>
      <Box mt={-3} bg="secondary" w="370px" h="130px" borderRadius="15px" p="20px 25px">
        <Text fontSize="sm" fontWeight="bold" mb={2}>
          seed
        </Text>
        <Input
          variant="flushed"
          color="textDark"
          fontSize="sm"
          letterSpacing={2}
          focusBorderColor="textDark"
        />
      </Box>

      <TextButtonHStack text="verify my seed" btnFontSize="xs" />
      <LoginButtonText handleLoginClick={handleLoginClick} pl={0} mt={2} />
    </Box>
  );
}

export default ImportSeed;
