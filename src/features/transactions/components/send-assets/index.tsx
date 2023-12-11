import TokenNftSwitch from "@/features/shared/components/token-nft-switch";
import { Box, Flex } from "@chakra-ui/react";
import SendToken from "../send-token";
import { useSelector } from "react-redux";
import { selectAssetType } from "@/features/wallet/redux/wallet.selectors";
import SendNft from "../send-nft";

function SendAssets() {
  const assetType = useSelector(selectAssetType);

  return (
    <Flex
      justify="center"
      align="center"
      h={["600px", null, null, "calc(100% - 45px)"]}
      bg="dark"
      borderRadius="30px"
      p={8}
      mr={[2, null, null, 0]}
    >
      <Box h="100%" w="100%" pos="relative">
        <Flex justify="center">
          <TokenNftSwitch />
        </Flex>

        {assetType === "token" ? <SendToken /> : <SendNft />}
      </Box>
    </Flex>
  );
}

export default SendAssets;
