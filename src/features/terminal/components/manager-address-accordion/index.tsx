import { MotionBox } from "@/components/motion-elements";
import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import AddressItem from "./address-item";
import { IWalletAddress, TWalletProvider } from "@/features/wallet/types";

export interface ManagerAddressAccordionProps {
  logo: React.ReactNode;
  wallets: IWalletAddress[];
  isDisabled?: boolean;
  // isActiveWalletProvider: boolean;
  walletProvider: TWalletProvider;
  handleManagerAddress: (value: string) => void;
  handleManagerWalletProvider: (value: TWalletProvider) => void;
  handleProceed: () => void;
  [anyProp: string]: any;
}

function ManagerAddressAccordion({
  logo,
  wallets,
  isDisabled,
  walletProvider,
  handleManagerAddress,
  handleProceed,
  handleManagerWalletProvider,
  ...props
}: ManagerAddressAccordionProps) {
  const { isOpen, onToggle } = useDisclosure();

  const handleToggle = () => {
    if (isDisabled) return;
    onToggle();
  };

  return (
    <MotionBox
      bg={"secondary"}
      opacity={wallets.length ? 1 : 0.3}
      borderRadius="30px"
      pos="relative"
      minH="100px"
      overflow="hidden"
      initial={{ height: 100 }}
      animate={{ height: isOpen ? "auto" : 100, paddingBottom: isOpen ? "20px" : "auto" }}
      {...props}
    >
      <Flex
        align="center"
        h="100px"
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
            handleManagerAddress={handleManagerAddress}
            handleProceed={handleProceed}
            handleManagerWalletProvider={handleManagerWalletProvider}
            issuerAddress={props.issuerAddress}
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

export default ManagerAddressAccordion;
