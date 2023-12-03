import { MotionText } from "@/components/motion-elements";
import { HStack, Image, Spacer } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAddress,
  selectNetwork,
  selectUserToken,
  selectWalletProvider,
} from "../../redux/wallet.selectors";
import { ISignIn, TNetwork } from "../../types";
import { setNetwork } from "../../redux/wallet.slice";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import twinArrowsImage from "@/assets/Refresh.png";
import { useLocalStorage } from "react-use";
import ItemDescription from "@/components/item-description";

function NetworkToggler() {
  const [signInData, storeSignInData] = useLocalStorage<ISignIn>("sign-in-data");

  const address = useSelector(selectAddress);
  const walletProvider = useSelector(selectWalletProvider);
  const userToken = useSelector(selectUserToken);

  const [twinArrowsAngle, setTwinArrowsAngle] = useState(0);

  const network = useSelector(selectNetwork);

  const dispatch = useDispatch();
  const _setNetwork = (network: TNetwork) => dispatch(setNetwork(network));

  const handleNetworkToggle = () => {
    if (network === "testnet") {
      _setNetwork("mainnet");
      if (signInData && walletProvider)
        storeSignInData({ ...signInData, userToken, address, walletProvider, network: "mainnet" });
    } else {
      _setNetwork("testnet");
      if (signInData && walletProvider)
        storeSignInData({ ...signInData, userToken, address, walletProvider, network: "testnet" });
    }
    setTwinArrowsAngle((prevState) => prevState + 180);
    document.location.reload();
  };

  return (
    <HStack>
      <HStack
        overflow="hidden"
        h="30px"
        w="80px"
        ml={3}
        mr={3}
        cursor="pointer"
        onClick={handleNetworkToggle}
      >
        <AnimatePresence>
          <MotionText
            key={network}
            color="textDark"
            fontSize="xs"
            fontWeight="bold"
            pos="absolute"
            initial={{ y: 10 }}
            animate={{ y: 0, transition: { duration: 0.4 } }}
            exit={{ y: -10, opacity: 0, transition: { duration: 0.4 } }}
          >
            {network}
          </MotionText>
        </AnimatePresence>
        <Spacer />
        <Image
          src={twinArrowsImage}
          alt=""
          h="25px"
          transition="0.4s linear all"
          transform={`rotate(${twinArrowsAngle}deg)`}
        />
      </HStack>
      <ItemDescription
        description="Changing the network here has no effect on your wallet provider"
        top={7}
        left={-150}
        h="70px"
      />
    </HStack>
  );
}

export default NetworkToggler;
