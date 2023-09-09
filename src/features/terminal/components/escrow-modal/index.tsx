import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import IconContainer from "../icon-container";
import HourGlassIcon from "@/icons/hour-glass";
import { AnimatePresence } from "framer-motion";
import { MotionBox } from "@/components/motion-elements";
import ArrowLeftIcon from "@/icons/arrow-left";
import { Link } from "react-router-dom";
import ROUTES from "@/routes";
import Button from "@/components/button";

export interface EscrowModalProps {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

function EscrowModal({ isOpen, handleOpen, handleClose }: EscrowModalProps) {
  return (
    <IconContainer
      title={isOpen ? "" : "Escrow"}
      cursor={isOpen ? "text" : "pointer"}
      handleClick={!isOpen ? () => handleOpen() : () => {}}
      bg={isOpen ? "transparent" : "#242424"}
    >
      {!isOpen && (
        <HourGlassIcon
          color="#686868"
          fill="#686868"
          fontSize="80px"
          cursor="pointer"
          transition="0.3s linear all"
          _hover={{
            transform: "rotate(-180deg)",
            transition: "0.3s linear all",
          }}
        />
      )}
      <AnimatePresence>
        {isOpen && (
          <MotionBox
            display="flex"
            bg="#242424"
            p="30px 35px"
            borderRadius="30px"
            position="absolute"
            initial={{ height: 1, width: 1, top: 0 }}
            animate={{
              height: "calc(100vh - 160px)",
              top: "20px",
              marginLeft: -200,
              width: "calc(100vw * 0.55)",
            }}
            exit={{ height: 1, width: 1, top: 0 }}
          >
            <Flex
              direction="column"
              justify="space-between"
              pr="30px"
              pb="20px"
              w="50%"
              borderRight="1px solid"
              borderColor="secondary"
            >
              <Box>
                <HStack mb={4}>
                  <ArrowLeftIcon fontSize="lg" onClick={handleClose} cursor="pointer" />
                  <Text fontWeight="bold" fontSize="sm">
                    Create Check
                  </Text>
                </HStack>

                {isOpen && (
                  <Text fontSize="xs" lineHeight={1.8}>
                    Escrow is a feature of the XRP Ledger that allows you to send conditional XRP
                    payments. These conditional payments, called escrows, set aside XRP and deliver
                    it later when certain conditions are met.
                  </Text>
                )}
              </Box>

              <Link to={ROUTES.TERMINAL_ESCROWS_CREATED_ESCROWS}>
                <Button w="100%" justifySelf="flex-end">
                  Created Escrows
                </Button>
              </Link>
            </Flex>
          </MotionBox>
        )}
      </AnimatePresence>
    </IconContainer>
  );
}

export default EscrowModal;
