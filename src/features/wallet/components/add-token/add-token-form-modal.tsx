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
  Spacer,
  Square,
  Switch,
  Text,
  useOutsideClick,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { TAddTokenModalType } from "../../types";
import { AnimatePresence } from "framer-motion";

export interface AddTokenFormModalProps {
  handleClose: () => void;
  handleTokenListIconClick: (type: TAddTokenModalType) => void;
}

function AddTokenFormModal({ handleClose, handleTokenListIconClick }: AddTokenFormModalProps) {
  const [isAdvancedOptionsDisabled] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: handleClose,
  });

  const handleAdvancedOptionsClick = () => {
    if (isAdvancedOptionsDisabled) return;

    if (showAdvancedOptions) setShowAdvancedOptions(false);
    else setShowAdvancedOptions(true);
  };

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
      animate={{
        opacity: 1,
        height: showAdvancedOptions ? "480px" : "370px",
        transition: { duration: 0.5 },
      }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <HStack spacing={5} pl={3} pt={2} mb={8}>
        <ArrowLeftIcon cursor="pointer" onClick={handleClose} />
        <Text fontSize="sm" fontWeight="bold">
          Add Token
        </Text>
      </HStack>

      <MotionBox
        px={4}
        mt={1}
        // border="1px solid red"
        height="260px"
        pos="relative"
        initial={{ height: "260px" }}
        animate={{ height: showAdvancedOptions ? "370px" : "260px", transition: { duration: 0.5 } }}
      >
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

        <HStack justify="flex-end" mb={1}>
          <HStack
            cursor={isAdvancedOptionsDisabled ? "not-allowed" : "pointer"}
            onClick={handleAdvancedOptionsClick}
          >
            <ThickArrowDownIcon
              color={isAdvancedOptionsDisabled ? "#5e5c5c" : "#fff"}
              fontSize="sm"
            />
            <Text
              fontSize="sm"
              fontWeight="bold"
              color={isAdvancedOptionsDisabled ? "#5e5c5c" : "#fff"}
            >
              Advanced options
            </Text>
          </HStack>
        </HStack>

        <AnimatePresence>
          {showAdvancedOptions && (
            <MotionBox
              mb={5}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
              <HStack mb={3}>
                <Text fontSize="2xs" color="textDark" fontWeight="bold">
                  Limit
                </Text>
                {/* info component goes here */}
              </HStack>
              <Input mb={3} />

              <HStack mb={3}>
                <Text fontSize="2xs" color="textDark" fontWeight="bold">
                  Rippling
                </Text>
                <Spacer />
                <Switch colorScheme="whatsapp" />
              </HStack>
            </MotionBox>
          )}
        </AnimatePresence>

        <Box pos="absolute" bottom={0} left={0} w="100%" px="inherit">
          <Button w="100%" h="40px" bg="secondary" color="textDark">
            confirm
          </Button>
        </Box>
      </MotionBox>
    </MotionBox>
  );
}

export default AddTokenFormModal;
