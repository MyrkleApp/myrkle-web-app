import { Box, Text } from "@chakra-ui/react";

export interface ShowDetailsOnHoverProps {
  fullText: string;
  shortText: string;
  color?: string;
  alignLeft?: boolean;
}

function ShowDetailsOnHover({ fullText, shortText, color, alignLeft }: ShowDetailsOnHoverProps) {
  return (
    <Box
      pos="relative"
      w="fit-content"
      _hover={{
        ".fullText": {
          display: "block",
        },
      }}
    >
      <Text
        className="fullText"
        display="none"
        fontSize="sm"
        fontWeight="bold"
        p="5px 10px"
        border="1px solid"
        borderColor={color || "#fff"}
        borderRadius="20px"
        bg="secondary"
        textAlign="center"
        position="absolute"
        top="0"
        left={alignLeft ? "0" : "50%"}
        transform={`translate(${alignLeft ? "0" : "-50%"}, -100%)`}
        zIndex={10}
      >
        {fullText}
      </Text>

      <Text fontSize="sm" fontWeight="bold" textAlign="center" color={color || "#fff"}>
        {shortText}
      </Text>
    </Box>
  );
}

export default ShowDetailsOnHover;
