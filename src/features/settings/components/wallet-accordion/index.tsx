import { MotionBox } from "@/components/motion-elements";
import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import AddressItem from "./address-item";
import { IWalletAddress, TWalletProvider } from "@/features/wallet/types";
import { useSelector } from "react-redux";
import { selectWalletProvider } from "@/features/wallet/redux/wallet.selectors";

export interface WalletAccordionProps {
  logo: React.ReactNode;
  wallets: IWalletAddress[];
  isDisabled?: boolean;
  // isActiveWalletProvider: boolean;
  walletProvider: TWalletProvider;
  [anyProp: string]: any;
}

function WalletAccordion({
  logo,
  wallets,
  isDisabled,
  walletProvider,
  ...props
}: WalletAccordionProps) {
  const { isOpen, onToggle } = useDisclosure();

  const currentWalletProvider = useSelector(selectWalletProvider);

  const isActiveWalletProvider = currentWalletProvider === walletProvider;

  const handleToggle = () => {
    if (isDisabled) return;
    onToggle();
  };

  return (
    <MotionBox
      bg={isActiveWalletProvider ? "secondary" : "darker"}
      opacity={wallets.length ? 1 : 0.3}
      borderRadius="30px"
      pos="relative"
      minH="80px"
      overflow="hidden"
      initial={{ height: 80 }}
      animate={{ height: isOpen ? "auto" : 80, paddingBottom: isOpen ? "20px" : "auto" }}
      {...props}
    >
      <Flex
        align="center"
        h="80px"
        p="25px 35px"
        cursor={isDisabled ? "not-allowed" : "pointer"}
        onClick={handleToggle}
      >
        {logo}
      </Flex>

      <Box as="hr" borderTop="1px solid gray" w="calc(100% - 70px)" mx="auto" mb={2} />

      <RenderAddressItems hasWallet={wallets.length > 0}>
        {wallets.map((_, i) => (
          <AddressItem
            key={i}
            name={wallets[i].name}
            address={wallets[i].address}
            selectedWalletProvider={walletProvider}
          />
        ))}
      </RenderAddressItems>
    </MotionBox>
  );
}

const RenderAddressItems = ({
  hasWallet,
  children,
}: {
  hasWallet: boolean;
  children: React.ReactNode;
}) => {
  if (!hasWallet) {
    return (
      <Text fontSize="sm" mx="auto" w="calc(100% - 70px)">
        You have no wallets connected to this provider.
      </Text>
    );
  }

  return <>{children}</>;
};

export default WalletAccordion;
