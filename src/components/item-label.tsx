import { HStack, Text } from "@chakra-ui/react";

export interface ItemLabelProps {
  title: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  [anyProp: string]: any;
}

function ItemLabel({ title, fontSize, fontWeight, color, ...props }: ItemLabelProps) {
  return (
    <HStack mb={2} {...props}>
      <Text fontSize={fontSize || "xs"} fontWeight={fontWeight || "bold"} color={color || "#fff"}>
        {title}
      </Text>
    </HStack>
  );
}

export default ItemLabel;
