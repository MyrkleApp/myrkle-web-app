import { HStack, Image, Spacer, Text } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import xrpTestnetLogo from "@/assets/xrp-testnet-logo.png";
import NetworkToggler from "@/features/wallet/components/network-toggler";
import SwitchAccountDropdown from "@/features/wallet/components/switch-account-dropdown";
import { useSelector } from "react-redux";
import { selectNetwork } from "@/features/wallet/redux/wallet.selectors";
import SignTransaction from "@/features/shared/components/sign-transaction";

function Navbar() {
  const network = useSelector(selectNetwork);

  return (
    <HStack h="100%">
      <HStack borderRight="1px solid #686666" pr={8}>
        <Image src={network === "mainnet" ? xrpLogo : xrpTestnetLogo} alt="xrp" h="25px" />
        <Text fontWeight="bold" fontSize="xs" letterSpacing={1}>
          XRP
        </Text>
      </HStack>
      <Spacer />
      <HStack>
        <SignTransaction />
        <SwitchAccountDropdown />
        {/* <AccountTypeDropdown /> */}
        <NetworkToggler />
      </HStack>
    </HStack>
  );
}

export default Navbar;
