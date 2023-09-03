import { Box, HStack, Image, SimpleGrid, Spacer, Text } from "@chakra-ui/react";
import IconContainer from "../components/icon-container";
import newAssetGray from "@/assets/asset-manager/new-gray.png";
import newAssetColored from "@/assets/asset-manager/new-colored.png";
import addAssetGray from "@/assets/asset-manager/add-gray.png";
import addAssetColored from "@/assets/asset-manager/add-colored.png";
import burnAssetGray from "@/assets/asset-manager/burn-gray.png";
import burnAssetColored from "@/assets/asset-manager/burn-colored.png";
import Layout from "@/layout";
import ArrowLeftIcon from "@/icons/arrow-left";
import ArrowRightIcon from "@/icons/arrow-right";
import { Link } from "react-router-dom";
import ROUTES from "@/routes";
import RemoveAsset from "../components/remove-asset";
import FreezeAsset from "../components/freeze-asset";
import UnfreezeAsset from "../components/unfreeze-asset";

function AssetManager() {
  return (
    <Layout>
      <Box h="100%">
        <HStack h="70px" align="flex-start">
          <Link to={ROUTES.TERMINAL}>
            <HStack mt={3}>
              <ArrowLeftIcon />
              <Text fontSize="sm" fontWeight="bold">
                Asset Manager
              </Text>
            </HStack>
          </Link>
          <Spacer />
          <HStack mt={3}>
            <Text fontSize="sm" fontWeight="bold">
              Created Assets
            </Text>
            <ArrowRightIcon />
          </HStack>
        </HStack>

        <Box h="calc(100% - 70px)" overflow="hidden auto">
          <SimpleGrid pr={3} pl={5} columns={5} spacingX={8} spacingY={10}>
            <Link to={ROUTES.TERMINAL_NEW_ASSET}>
              <IconContainer title="New Asset" h="180px">
                <Image src={newAssetGray} alt="New Asset" h="60px" className="gray" />
                <Image src={newAssetColored} alt="New Asset" h="60px" className="colored" />
              </IconContainer>
            </Link>
            <Link to={ROUTES.TERMINAL_ADD_ASSET}>
              <IconContainer title="Add Asset" h="180px">
                <Image src={addAssetGray} alt="Add Asset" h="60px" className="gray" />
                <Image src={addAssetColored} alt="Add Asset" h="60px" className="colored" />
              </IconContainer>
            </Link>
            <RemoveAsset />
            <FreezeAsset />
            <UnfreezeAsset />
            <IconContainer title="Burn Asset" h="180px">
              <Image src={burnAssetGray} alt="burn Asset" h="60px" className="gray" />
              <Image src={burnAssetColored} alt="burn Asset" h="60px" className="colored" />
            </IconContainer>
          </SimpleGrid>
        </Box>
      </Box>
    </Layout>
  );
}

export default AssetManager;
