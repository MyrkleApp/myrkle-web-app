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
        // h="250px"
        aspectRatio={1 / 1.15}
        mb={7}
        position="relative"
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

        <Text
          fontSize="sm"
          fontWeight="bold"
          textAlign="center"
          letterSpacing={1}
          visibility={props.visibility || "visible"}
          position="absolute"
          bottom="-40px"
        >
          {title}
        </Text>
      </MotionBox>
    </Box>
  );
}

export default IconContainer;
