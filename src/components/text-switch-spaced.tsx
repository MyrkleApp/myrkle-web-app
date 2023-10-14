import { HStack, Spacer, Switch, Text } from "@chakra-ui/react";

export interface TextSwitchSpacedProps {
  isChecked: boolean;
  handleChange: (value: any) => void;
  title: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  [anyProp: string]: any;
}

function TextSwitchSpaced({
  isChecked,
  handleChange,
  title,
  fontSize,
  fontWeight,
  color,
  ...props
}: TextSwitchSpacedProps) {
  return (
    <HStack mb={4} {...props}>
      <HStack>
        <Text fontSize={fontSize || "xs"} fontWeight={fontWeight || "bold"} color={color || "#fff"}>
          {title}
        </Text>
      </HStack>

      <Spacer />

      <Switch colorScheme="whatsapp" isChecked={isChecked} onChange={handleChange} />
    </HStack>
  );
}

export default TextSwitchSpaced;
