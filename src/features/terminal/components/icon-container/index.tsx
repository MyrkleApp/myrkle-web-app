import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

export interface IconContainerProps {
  children: React.ReactNode;
  title: string;
  handleClick?: () => void;
  [anyProp: string]: any;
}

function IconContainer({ children, title, handleClick, ...props }: IconContainerProps) {
  return (
    <Box onClick={handleClick}>
      <Flex
        align="center"
        justify="center"
        bg="#242424"
        borderRadius="20px"
        h="250px"
        mb={7}
        cursor="pointer"
        {...props}
        sx={{
          "& .colored": {
            display: "none",
          },
        }}
        _hover={{
          "& .colored": {
            display: "inline-block",
          },
          "& .gray": {
            display: "none",
          },
        }}
      >
        {children}
      </Flex>
      <Text fontSize="sm" fontWeight="bold" textAlign="center">
        {title}
      </Text>
    </Box>
  );
}

export default IconContainer;
