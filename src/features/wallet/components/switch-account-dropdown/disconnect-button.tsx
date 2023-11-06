import { Box } from "@chakra-ui/react";

export interface DisconnectButtonProps {
  handleClick: (e: any) => void;
}

function DisconnectButton({ handleClick }: DisconnectButtonProps) {
  return (
    <Box
      h="10px"
      w="10px"
      borderRadius="50%"
      bg="#ff0000"
      _hover={{ w: "13px", h: "13px" }}
      onClick={handleClick}
    />
  );
}

export default DisconnectButton;
