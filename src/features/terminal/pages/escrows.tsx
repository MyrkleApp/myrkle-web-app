import Button from "@/components/button";
import { MotionBox } from "@/components/motion-elements";
import ArrowLeftIcon from "@/icons/arrow-left";
import Layout from "@/layout";
import ROUTES from "@/routes";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import SelectTokenEscrow from "../components/select-token-escrow";

function Escrows() {
  const navigate = useNavigate();

  return (
    <Layout>
      <AnimatePresence>
        <MotionBox
          display="flex"
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          h="90%"
          w="70%"
          bg="dark"
          p="30px 35px"
          borderRadius="30px"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
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
                <ArrowLeftIcon fontSize="lg" cursor="pointer" onClick={() => navigate(-1)} />
                <Text fontWeight="bold" fontSize="sm">
                  Create Escrow
                </Text>
              </HStack>

              <Text fontSize="xs" lineHeight={1.8}>
                Escrow is a feature of the XRP Ledger that allows you to send conditional XRP
                payments. These conditional payments, called escrows, set aside XRP and deliver it
                later when certain conditions are met.
              </Text>
            </Box>

            <Link to={ROUTES.TERMINAL_ESCROWS_CREATED_ESCROWS}>
              <Button w="100%" justifySelf="flex-end">
                Created Escrows
              </Button>
            </Link>
          </Flex>

          <Box pl="30px" w="50%">
            <SelectTokenEscrow />
          </Box>
        </MotionBox>
      </AnimatePresence>
    </Layout>
  );
}

export default Escrows;
