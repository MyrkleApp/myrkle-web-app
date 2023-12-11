import ArrowLeftIcon from "@/icons/arrow-left";
import Layout from "@/layout";
import ROUTES from "@/routes";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";
import MintNftForm from "../components/mint-nft-form";
import { useEffect, useState } from "react";
import Button from "@/components/button";
import MintToken from "../components/mint-token";

const mintTokenText: string = `Unleash the power of the XRP Ledger beyond its native asset. Myrkle allows you to represent all kinds of assets as tokens, opening a world of possibilities. Whether it's a "stablecoin" pegged to real-world assets, a purely digital token designed for specific use cases, or even a community credit system, the XRP Ledger can handle it all. Thanks to the fungibility of standard tokens, each unit holds equal value and is indistinguishable from others within its class, ensuring fairness and transparency in their distribution and exchange.`;
const mintNftText = `Non-fungible tokens (NFTs, or 'nifties' in the vernacular) serve to encode ownership of unique physical, non-physical, or purely digital goods, such as works of art or in-game items. Non Fungible tokens can be traded between users for XRP or other issued assets on the XRP Ledger's decentralized exchange. This makes them ideal for payments.`;

function NewAsset() {
  const [searchParams] = useSearchParams();
  const urlAssetType = searchParams.get("asset");

  const [assetType, setAssetType] = useState<"token" | "nft">("token");

  useEffect(() => {
    if (urlAssetType === "nft") {
      setAssetType("nft");
    }
  }, [urlAssetType]);

  return (
    <Layout>
      <HStack h="50px">
        <Link to={ROUTES.TERMINAL_ASSET_MANAGER}>
          <HStack>
            <ArrowLeftIcon />
            <Text fontSize="lg" fontWeight="bold">
              Add Asset
            </Text>
          </HStack>
        </Link>
      </HStack>

      <Flex
        h="calc(100% - 50px)"
        bg="dark"
        borderRadius="20px"
        p={5}
        gap={3}
        justify="space-between"
      >
        <Box bg="" w="170px">
          <Button
            w="100%"
            borderRadius="30px"
            h="35px"
            bg={assetType === "token" ? "rgba(0, 223, 22, 0.27)" : "none"}
            fontWeight="400"
            textAlign="left"
            justifyContent="flex-start"
            _hover={assetType === "token" ? "rgba(0, 223, 22, 0.27)" : "none"}
            onClick={() => setAssetType("token")}
          >
            Mint Token
          </Button>
          <Box as="hr" borderTop="1px solid #8f8e8e6a" my={3} />
          <Button
            w="100%"
            borderRadius="30px"
            h="35px"
            bg={assetType === "nft" ? "rgba(0, 223, 22, 0.27)" : "none"}
            fontWeight="400"
            textAlign="left"
            justifyContent="space-between"
            _hover={assetType === "nft" ? "rgba(0, 223, 22, 0.27)" : "none"}
            onClick={() => setAssetType("nft")}
          >
            Mint NFT
          </Button>
        </Box>
        <Box bg="" w="30%">
          <Text className="font-face-proxima-nova-extrabld" fontSize="sm" mb={3}>
            {assetType === "token" ? "Mint Token" : "Mint NFT"}
          </Text>
          <Text fontSize="xs">{assetType === "token" ? mintTokenText : mintNftText}</Text>
        </Box>
        <Box w="40%" overflow="hidden auto">
          {assetType === "token" ? <MintToken /> : <MintNftForm />}
        </Box>
      </Flex>
    </Layout>
  );
}

export default NewAsset;
