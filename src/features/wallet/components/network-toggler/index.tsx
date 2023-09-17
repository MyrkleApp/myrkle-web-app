import { MotionText } from "@/components/motion-elements";
import { HStack, Image, Spacer } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { selectNetwork } from "../../redux/wallet.selectors";
import { TNetwork } from "../../types";
import { setNetwork } from "../../redux/wallet.slice";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import twinArrowsImage from "@/assets/Refresh.png";

function NetworkToggler() {
  const [twinArrowsAngle, setTwinArrowsAngle] = useState(0);

  const network = useSelector(selectNetwork);

  const dispatch = useDispatch();
  const _setNetwork = (network: TNetwork) => dispatch(setNetwork(network));

  const handleNetworkToggle = () => {
    if (network === "testnet") _setNetwork("devnet");
    if (network === "devnet") _setNetwork("mainnet");
    if (network === "mainnet") _setNetwork("testnet");
    setTwinArrowsAngle((prevState) => prevState + 180);
  };

  return (
    <HStack
      overflow="hidden"
      h="30px"
      w="80px"
      ml={3}
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
  );
}

export default NetworkToggler;
