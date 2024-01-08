import { Box } from "@chakra-ui/react";

export interface HoverDetailProps {
  text: string;
  [anyProp: string]: any;
}

function HoverDetail({ text, ...props }: HoverDetailProps) {
  return (
    <Box
      id="hover-detail"
      display="none"
      pos="absolute"
      top={-4}
      left="50%"
      transform="translateX(-50%)"
      border="1px solid black"
      borderRadius="10px"
      bg="#000"
      p="1px 5px"
      fontSize="xs"
      {...props}
    >
      {text}
    </Box>
  );
}

export default HoverDetail;
