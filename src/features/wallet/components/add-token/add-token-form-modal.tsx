import Button from "@/components/button";
import Input from "@/components/input";
import { MotionBox } from "@/components/motion-elements";
import ArrowLeftIcon from "@/icons/arrow-left";
import ThickArrowDownIcon from "@/icons/thick-arrow-down";
import TokenListIcon from "@/icons/token-list";
import {
  Box,
  HStack,
  InputGroup,
  InputRightElement,
  Square,
  Text,
  useOutsideClick,
} from "@chakra-ui/react";
import { useRef } from "react";
import { TAddTokenModalType } from "../../types";

export interface AddTokenFormModalProps {
  handleClose: () => void;
  handleTokenListIconClick: (type: TAddTokenModalType) => void;
}

function AddTokenFormModal({ handleClose, handleTokenListIconClick }: AddTokenFormModalProps) {
  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: handleClose,
  });

  return (
    <MotionBox
      ref={ref}
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      h="370px"
      w="350px"
      p={4}
      bg="darker"
      borderRadius="15px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <HStack spacing={5} pl={3} pt={2} mb={8}>
        <ArrowLeftIcon cursor="pointer" onClick={handleClose} />
        <Text fontSize="sm" fontWeight="bold">
          Add Token
        </Text>
      </HStack>

      <Box px={4} mt={1}>
        <HStack mb={3}>
          <Text fontSize="2xs" color="textDark" fontWeight="bold">
            Token name
          </Text>
          {/* info component goes here */}
        </HStack>
        <InputGroup>
          <Input mb={5} pr={10} />
          <InputRightElement>
            <Square
              bg="#535353"
              size="30px"
              borderRadius="5px"
              cursor="pointer"
              onClick={() => handleTokenListIconClick("select-token")}
            >
              <TokenListIcon fill="none" />
            </Square>
          </InputRightElement>
        </InputGroup>

        <HStack mb={3}>
          <Text fontSize="2xs" color="textDark" fontWeight="bold">
            Issuer
          </Text>
          {/* info component goes here */}
        </HStack>
        <Input mb={5} />

        <HStack cursor="pointer" justify="flex-end" mb={4}>
          <ThickArrowDownIcon color="#fff" fontSize="sm" />
          <Text color="#fff" fontSize="sm" fontWeight="bold">
            Advanced options
          </Text>
        </HStack>

        <Button w="100%" h="40px" bg="secondary" color="textDark">
          confirm
        </Button>
      </Box>
    </MotionBox>
  );
}

export default AddTokenFormModal;
