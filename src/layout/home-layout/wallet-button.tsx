import { HStack, Image, Text } from "@chakra-ui/react";
import wallet from "@/assets/wallet.png";
import walletHover from "@/assets/wallet-hover.png";
import { Link } from "react-router-dom";
import ROUTES from "@/routes";
import { useSelector } from "react-redux";
import { selectMyWallets } from "@/features/wallet/redux/wallet.selectors";
import { selectIsAuthUser } from "@/features/auth/redux/auth.selectors";

function WalletButton() {
  const myWallets = useSelector(selectMyWallets);
  const isAuthUser = useSelector(selectIsAuthUser);

  const handleNavigate = () => {
    if (isAuthUser && myWallets.length > 0) {
      return ROUTES.WALLET;
    }
    return ROUTES.AUTH;
  };

  return (
    <Link to={handleNavigate()}>
      <HStack
        bg="#D9D9D9"
        p="2px 15px"
        borderRadius="25px"
        spacing={3}
        _hover={{
          bg: "primary",
          p: {
            color: "#fff",
          },
          ".show": {
            display: "none",
          },
          ".hover": {
            display: "inline-block",
          },
        }}
      >
        <Image src={wallet} alt="" className="show" />
        <Image src={walletHover} alt="" className="hover" display="none" />
        <Text fontSize="sm" color="#000">
          Wallet
        </Text>
      </HStack>
    </Link>
  );
}

export default WalletButton;
