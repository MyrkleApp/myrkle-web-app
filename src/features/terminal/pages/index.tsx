import Layout from "@/layout";
import { Box, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import IconContainer from "../components/icon-container";
import FolderIcon from "@/icons/folder";
import CogIcon from "@/icons/cog";
import ChecksIcon from "@/icons/checks";
import FlagIcon from "@/icons/flag";
import { Link } from "react-router-dom";
import ROUTES from "@/routes";
import HourGlassIcon from "@/icons/hour-glass";

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
      </Box>
    </Layout>
  );
}

export default Terminal;
