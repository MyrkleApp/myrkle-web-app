import ArrowLeftIcon from "@/icons/arrow-left";
import Layout from "@/layout";
import ROUTES from "@/routes";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";
import MintNftForm from "../components/mint-nft-form";
import { useEffect, useState } from "react";
import Button from "@/components/button";
import MintTokenForm from "../components/mint-token-form";

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
            <Text fontSize="sm" fontWeight="bold">
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
          <Text fontSize="xs">
            Lorem ipsum dolor sit amet, consectetur adip allows users to create deferred payments
            that can be canceled or cashed by the intended recipients. Like personal paper checks,
            XRP Ledger Checks start with the sender of the funds creating a Check that specifies an
            amount and a recipient.
          </Text>
        </Box>
        <Box w="40%" overflow="hidden auto">
          {assetType === "token" ? <MintTokenForm /> : <MintNftForm />}
        </Box>
      </Flex>
    </Layout>
  );
}

export default NewAsset;
