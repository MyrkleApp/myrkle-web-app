import Button from "@/components/button";
import { MotionBox } from "@/components/motion-elements";
import ArrowLeftIcon from "@/icons/arrow-left";
import Layout from "@/layout";
import ROUTES from "@/routes";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import SelectTokenChecks from "../components/select-token-checks";

function Checks() {
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
          w={["100%", null, null, "90%", "70%"]}
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
                  Create Check
                </Text>
              </HStack>

              <Text fontSize="xs" lineHeight={1.8}>
                The Checks feature in the XRP Ledger allows users to create deferred payments that
                can be canceled or cashed by the intended recipients. Like personal paper checks,
                XRP Ledger Checks start with the sender of the funds creating a Check that specifies
                an amount and a recipient.{" "}
              </Text>
            </Box>

            <Link to={ROUTES.TERMINAL_CHECKS_CREATED_CHECKS}>
              <Button w="100%" justifySelf="flex-end">
                Checks
              </Button>
            </Link>
          </Flex>

          <Box pl="30px" w="50%">
            <SelectTokenChecks />
          </Box>
        </MotionBox>
      </AnimatePresence>
    </Layout>
  );
}

export default Checks;
