import { Flex, Text } from "@chakra-ui/react";

export interface ToastElementProps {
  children?: React.ReactNode;
  [anyProp: string]: any;
}

function ToastElement({ children, ...props }: ToastElementProps) {
  return (
    <Flex justify="center" color="white" p={1} bg="dark" borderRadius="20px" w="150px" {...props}>
      <Text fontSize="xs" color="#fff">
        {children || "copied to clipboard"}
      </Text>
    </Flex>
  );
}

export default ToastElement;
