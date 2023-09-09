import Layout from "@/layout";
import { Box, SimpleGrid } from "@chakra-ui/react";
import IconContainer from "../components/icon-container";
import FolderIcon from "@/icons/folder";
import CogIcon from "@/icons/cog";
import ChecksIcon from "@/icons/checks";
import HourGlassIcon from "@/icons/hour-glass";
import FlagIcon from "@/icons/flag";
import { Link } from "react-router-dom";
import ROUTES from "@/routes";

function Terminal() {
  return (
    <Layout>
      <SimpleGrid columns={4} px={10} spacing={8}>
        <Link to={ROUTES.TERMINAL_ASSET_MANAGER}>
          <IconContainer title="Asset Manager">
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
          <IconContainer title="Checks">
            <ChecksIcon color="#686868" fill="#686868" fontSize="80px" cursor="pointer" />
          </IconContainer>
        </Link>
        <IconContainer title="Escrow">
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
        <IconContainer title="Flags">
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
      </SimpleGrid>
    </Layout>
  );
}

export default Terminal;
