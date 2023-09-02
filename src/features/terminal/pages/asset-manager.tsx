import { Box, HStack, Image, SimpleGrid, Spacer, Text } from "@chakra-ui/react";
import IconContainer from "../components/icon-container";
import newAssetGray from "@/assets/asset-manager/new-gray.png";
import newAssetColored from "@/assets/asset-manager/new-colored.png";
import addAssetGray from "@/assets/asset-manager/add-gray.png";
import addAssetColored from "@/assets/asset-manager/add-colored.png";
import removeAssetGray from "@/assets/asset-manager/remove-gray.png";
import removeAssetColored from "@/assets/asset-manager/remove-colored.png";
import freezeAssetGray from "@/assets/asset-manager/freeze-gray.png";
import freezeAssetColored from "@/assets/asset-manager/freeze-colored.png";
import unfreezeAssetGray from "@/assets/asset-manager/unfreeze-gray.png";
import unfreezeAssetColored from "@/assets/asset-manager/unfreeze-colored.png";
import burnAssetGray from "@/assets/asset-manager/burn-gray.png";
import burnAssetColored from "@/assets/asset-manager/burn-colored.png";
import Layout from "@/layout";
import ArrowLeftIcon from "@/icons/arrow-left";
import ArrowRightIcon from "@/icons/arrow-right";
import { Link } from "react-router-dom";
import ROUTES from "@/routes";

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
            <IconContainer title="Remove Asset" h="180px">
              <Image src={removeAssetGray} alt="remove Asset" h="60px" className="gray" />
              <Image src={removeAssetColored} alt="remove Asset" h="60px" className="colored" />
            </IconContainer>
            <IconContainer title="Freeze Asset" h="180px">
              <Image src={freezeAssetGray} alt="freeze Asset" h="60px" className="gray" />
              <Image src={freezeAssetColored} alt="freeze Asset" h="60px" className="colored" />
            </IconContainer>
            <IconContainer title="Unfreeze Asset" h="180px">
              <Image src={unfreezeAssetGray} alt="unfreeze Asset" h="60px" className="gray" />
              <Image src={unfreezeAssetColored} alt="unfreeze Asset" h="60px" className="colored" />
            </IconContainer>
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
