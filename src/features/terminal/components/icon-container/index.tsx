import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { MotionBox } from "@/components/motion-elements";

export interface IconContainerProps {
  children: React.ReactNode;
  title: string;
  handleClick?: () => void;
  [anyProp: string]: any;
}

function IconContainer({ children, title, handleClick, ...props }: IconContainerProps) {
  return (
    <Box onClick={handleClick}>
      <MotionBox
        display="flex"
        alignItems="center"
        justifyContent="center"
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
      </MotionBox>
      <Text
        fontSize="sm"
        fontWeight="bold"
        textAlign="center"
        visibility={props.visibility || "visible"}
      >
        {title}
      </Text>
    </Box>
  );
}

export default IconContainer;
