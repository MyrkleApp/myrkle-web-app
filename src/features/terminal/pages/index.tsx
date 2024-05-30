import Layout from "@/layout";
import { Box, Flex, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import IconContainer from "../components/icon-container";
import FolderIcon from "@/icons/folder";
import CogIcon from "@/icons/cog";
import ChecksIcon from "@/icons/checks";
import FlagIcon from "@/icons/flag";
import { Link } from "react-router-dom";
import ROUTES from "@/routes";
import HourGlassIcon from "@/icons/hour-glass";
import Dapps from "../components/dapps";
import Button from "@/components/button";
import ExternalLinkIcon from "@/icons/external-link";
import { openDhaliPaymentDialog } from "@/helpers";

function Terminal() {
  // todo: remove this rubbish!
  const { isOpen } = useDisclosure();

  return (
    <Layout>
      <Box h="100%" overflow="hidden auto">
        <SimpleGrid columns={[1, 2, 3, 4]} px={10} spacing={8}>
          <Link to={ROUTES.TERMINAL_ASSET_MANAGER}>
            <IconContainer title="Asset Manager" visibility={isOpen ? "hidden" : "visible"}>
              <Box
                pos="relative"
                cursor="pointer"
                _hover={{
                  ".cog-icon": {
                    transform: "rotate(-270deg)",
                    transition: "0.5s linear all",
                  },
                }}
              >
                <FolderIcon fontSize="80px" />
                <CogIcon
                  className="cog-icon"
                  position="absolute"
                  top="5px"
                  right="-5px"
                  fontSize="45px"
                  transition="0.5s linear all"
                />
              </Box>
            </IconContainer>
          </Link>
          <Link to={ROUTES.TERMINAL_CHECKS}>
            <IconContainer title="Checks" visibility={isOpen ? "hidden" : "visible"}>
              <ChecksIcon color="#686868" fill="#686868" fontSize="80px" cursor="pointer" />
            </IconContainer>
          </Link>
          <Link to={ROUTES.TERMINAL_ESCROWS}>
            <IconContainer title="Escrows" visibility={isOpen ? "hidden" : "visible"}>
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
            </IconContainer>
          </Link>
          {/* <EscrowModal isOpen={isOpen} handleOpen={onOpen} handleClose={onClose} /> */}
          <Link to={ROUTES.TERMINAL_FLAGS}>
            <IconContainer title="Flags" visibility={isOpen ? "hidden" : "visible"}>
              <Box>
                <FlagIcon
                  fontSize="80px"
                  cursor="pointer"
                  transition="0.3s linear all"
                  _hover={{
                    transform: "rotateY(-180deg)",
                    transition: "0.3s linear all",
                  }}
                />
              </Box>
            </IconContainer>
          </Link>
        </SimpleGrid>

        <Dapps />

        <Flex justify="flex-end" align="center" gap={3} px={10} mt={5}>
          <Button bg="#242424" onClick={openDhaliPaymentDialog}>
            Generate Payment Claim with Dhali
          </Button>
          <a
            href="https://app.dhali.io/#/assets/d2bb727c7-d44a-4ed3-a031-fd15b3903486"
            target="_blank"
          >
            <Text fontSize="sm" color="success" mt="-2px">
              Test Myrkle's APIs on Dhali
              <Text as="span" ml={2}>
                <ExternalLinkIcon mt="-5px" />
              </Text>
            </Text>
          </a>
        </Flex>
      </Box>
    </Layout>
  );
}

export default Terminal;
