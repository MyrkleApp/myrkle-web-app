import { MotionBox } from "@/components/motion-elements";
import { HStack, InputGroup, Box, Text, useOutsideClick, InputLeftElement } from "@chakra-ui/react";
import Input from "@/components/input";
import { useRef } from "react";
import ArrowLeftIcon from "@/icons/arrow-left";
import { TAddTokenModalType } from "../../types";
import TokenItem from "./token-item";
import SearchIcon from "@/icons/search";

export interface SelectTokenModalProps {
  handleClose: () => void;
  handleArrowLeftIconClick: (type: TAddTokenModalType) => void;
}

function SelectTokenModal({ handleClose, handleArrowLeftIconClick }: SelectTokenModalProps) {
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
      maxH="90%"
      h="500px"
      w="350px"
      p={4}
      bg="darker"
      borderRadius="15px"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <HStack spacing={5} pl={3} pt={2} mb={8}>
        <ArrowLeftIcon
          cursor="pointer"
          onClick={() => handleArrowLeftIconClick("add-token-form")}
        />
        <Text fontSize="sm" fontWeight="bold">
          Select Token
        </Text>
      </HStack>

      <InputGroup>
        <Input
          mb={3}
          pl={10}
          borderRadius="30px"
          placeholder="Search name or paste address"
          fontSize="sm"
          border="2px solid"
          borderColor="success"
          bg="rgba(0, 223, 22, 0.27)"
          color="#fff"
          _hover={{ borderColor: "success" }}
        />
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
      </InputGroup>

      <Box px={4} mt={1} h="calc(100% - 140px)" overflow="hidden auto">
        {Array(20)
          .fill(null)
          .map((_, i) => (
            <TokenItem key={i} />
          ))}
      </Box>
    </MotionBox>
  );
}

export default SelectTokenModal;
