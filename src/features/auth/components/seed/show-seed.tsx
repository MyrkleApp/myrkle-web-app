import Button from "@/components/button";
import ArrowLeftIcon from "@/icons/arrow-left";
import MyrkleLogoIcon from "@/icons/logo";
import { Box, HStack, Input, Spacer, Text } from "@chakra-ui/react";
import TextButtonHStack from "../text-button-hstack";
import LoginButtonText from "../login-button-text";

export interface ShowSeedProps {
  handleBackArrowClick: () => void;
  handleLoginClick: () => void;
}

function ShowSeed({ handleBackArrowClick, handleLoginClick }: ShowSeedProps) {
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

      <TextButtonHStack text="I have backed up my seed" btnFontSize="xs" />
      <LoginButtonText handleLoginClick={handleLoginClick} pl={0} mt={2} />
    </Box>
  );
}

export default ShowSeed;
