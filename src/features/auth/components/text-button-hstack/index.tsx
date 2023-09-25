import Button from "@/components/button";
import { HStack, Spacer, Text } from "@chakra-ui/react";

export interface TextButtonHStackProps {
  text: string;
  btnText?: string;
  btnWidth?: string;
  btnFontSize?: string;
  handleClick?: () => void;
}

function TextButtonHStack({
  text,
  btnText,
  btnWidth,
  btnFontSize,
  handleClick,
}: TextButtonHStackProps) {
  return (
    <HStack bg="secondary" mt={3} pl={2} borderRadius="5px">
      <Text fontSize="xs">{text}</Text>
      <Spacer />
      <Button
        w={btnWidth || "40%"}
        h="30px"
        borderRadius="7px"
        _hover={{ bg: "primary" }}
        onClick={handleClick}
        fontSize={btnFontSize || "sm"}
      >
        {btnText || "continue"}
      </Button>
    </HStack>
  );
}

export default TextButtonHStack;
