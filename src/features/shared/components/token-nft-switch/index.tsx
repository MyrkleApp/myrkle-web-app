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
      w="270px"
      pos="relative"
      h="55px"
      bg="dark"
      borderRadius="30px"
      boxShadow="0 2px 5px #0f0f0f"
    >
      <MotionBox
        mt="3px"
        h="49px"
        // w="130px"
        bg="darkest"
        borderRadius="30px"
        border="3px solid"
        borderColor="dark"
        pos="absolute"
        top="0"
        initial={{ left: 0, width: 125 }}
        animate={{
          left: assetType === "token" ? 4 : 146,
          width: assetType === "token" ? 140 : 120,
          transition: { duration: 0.4 },
        }}
        {...sliderProps}
      />
      <Text
        className="font-face-proxima-nova-extrabld"
        fontSize={assetType === "token" ? "3vh" : "sm"}
        fontWeight={assetType === "token" ? "bold" : "400"}
        pos="absolute"
        left="48px"
        color={assetType === "token" ? "#fff" : "textDark"}
        cursor="pointer"
        onClick={_toggleAssetType}
      >
        Token
      </Text>
      <Spacer />
      <Text
        className="font-face-proxima-nova-extrabld"
        fontSize={assetType === "nft" ? "3vh" : "sm"}
        fontWeight={assetType === "nft" ? "bold" : "400"}
        pos="absolute"
        right="39px"
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
