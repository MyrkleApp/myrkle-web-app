import { MotionBox } from "@/components/motion-elements";
import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import AddressItem from "./address-item";
import { IWalletAddress, TWalletProvider } from "@/features/wallet/types";

export interface IssuerAddressAccordionProps {
  logo: React.ReactNode;
  wallets: IWalletAddress[];
  isDisabled?: boolean;
  walletProvider: TWalletProvider;
  handleIssuerAddress: (value: string) => void;
  handleIssuerWalletProvider: (value: TWalletProvider) => void;
  handleProceed: () => void;
  [anyProp: string]: any;
}

function IssuerAddressAccordion({
  logo,
  wallets,
  isDisabled,
  walletProvider,
  handleIssuerAddress,
  handleIssuerWalletProvider,
  handleProceed,
  ...props
}: IssuerAddressAccordionProps) {
  const { isOpen, onToggle } = useDisclosure();

  const handleToggle = () => {
    if (isDisabled) return;
    onToggle();

    console.log("hello world");
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
            handleIssuerAddress={handleIssuerAddress}
            handleIssuerWalletProvider={handleIssuerWalletProvider}
            handleProceed={handleProceed}
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

export default IssuerAddressAccordion;
