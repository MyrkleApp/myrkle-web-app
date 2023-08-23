import { MotionBox } from "@/components/motion-elements";
import { selectAssetType } from "@/features/wallet/redux/wallet.selectors";
import { toggleAssetType } from "@/features/wallet/redux/wallet.slice";
import { HStack, Spacer, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

export interface TokenNftSwitchProps {
  sliderProps?: any;
}

function TokenNftSwitch({ sliderProps }: TokenNftSwitchProps) {
  const assetType = useSelector(selectAssetType);

  const dispatch = useDispatch();
  const _toggleAssetType = () => dispatch(toggleAssetType());

  return (
    <HStack
      w="225px"
      pos="relative"
      h="44px"
      bg="dark"
      borderRadius="30px"
      boxShadow="0 2px 5px #0f0f0f"
    >
      <MotionBox
        mt="2px"
        h="40px"
        w="130px"
        bg="darkest"
        borderRadius="30px"
        border="3px solid"
        borderColor="dark"
        pos="absolute"
        top="0"
        initial={{ left: 0, width: 125 }}
        animate={{
          left: assetType === "token" ? 2 : 118,
          width: assetType === "token" ? 120 : 105,
          transition: { duration: 0.4 },
        }}
        {...sliderProps}
      />
      <Text
        fontSize={assetType === "token" ? "sm" : "xs"}
        fontWeight={assetType === "token" ? "bold" : "400"}
        pos="absolute"
        left="43px"
        color={assetType === "token" ? "#fff" : "textDark"}
        cursor="pointer"
        onClick={_toggleAssetType}
      >
        Token
      </Text>
      <Spacer />
      <Text
        fontSize={assetType === "nft" ? "sm" : "xs"}
        fontWeight={assetType === "nft" ? "bold" : "400"}
        pos="absolute"
        right="40px"
        color={assetType === "nft" ? "#fff" : "textDark"}
        cursor="pointer"
        onClick={_toggleAssetType}
      >
        NFT
      </Text>
    </HStack>
  );
}

export default TokenNftSwitch;
