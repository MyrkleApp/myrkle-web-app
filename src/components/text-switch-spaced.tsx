import { HStack, Spacer, Switch, Text } from "@chakra-ui/react";

export interface TextSwitchSpacedProps {
  title: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  [anyProp: string]: any;
}

function TextSwitchSpaced({ title, fontSize, fontWeight, color, ...props }: TextSwitchSpacedProps) {
  return (
    <HStack mb={4} {...props}>
      <HStack>
        <Text fontSize={fontSize || "xs"} fontWeight={fontWeight || "bold"} color={color || "#fff"}>
          {title}
        </Text>
      </HStack>

      <Spacer />

      <Switch colorScheme="whatsapp" />
    </HStack>
  );
}

export default TextSwitchSpaced;
