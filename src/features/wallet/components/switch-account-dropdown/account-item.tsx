import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Text,
} from "@chakra-ui/react";
import { IWalletAddress } from "../../types";
import { ellipsisAtCenter } from "@/helpers";
import PlusIcon from "@/icons/plus";
import { Link } from "react-router-dom";
import ROUTES from "@/routes";

export interface AccountItemProps {
  logo: React.ReactNode;
  wallets: IWalletAddress[];
  isActiveProvider: boolean;
  handleSelectedWallet: (walletAddress: IWalletAddress) => void;
  handleNewWallet: () => void;
}

function AccountItem({
  logo,
  wallets,
  isActiveProvider,
  handleSelectedWallet,
  handleNewWallet,
}: AccountItemProps) {
  const handleWalletAddressClick = (wallet: IWalletAddress) => {
    if (isActiveProvider && wallet.walletProvider !== "xumm") return;
    handleSelectedWallet(wallet);
  };

  const handlePlusIconClick = (e: any) => {
    e.stopPropagation();
    handleNewWallet();
  };

  return (
    <AccordionItem
      border="none"
      bg={isActiveProvider ? "secondary" : "darker"}
      borderRadius="20px"
      mb={1}
    >
      {({ isExpanded }) => (
        <>
          <AccordionButton py="2px">
            <Box as="span" flex="1" textAlign="left" h="25px" overflow="hidden">
              {logo}
            </Box>
            {isExpanded ? (
              <PlusIcon fontSize="2xs" mr={1} onClick={handlePlusIconClick} />
            ) : (
              <Text fontSize="2xs" color="gray" mr={1}>
                {wallets?.length || "-"}
              </Text>
            )}
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            {wallets?.length ? (
              wallets.slice(0, 2).map((wallet, i) => (
                <HStack key={i} mb={1}>
                  <Text
                    fontSize="2xs"
                    cursor={
                      isActiveProvider && wallet.walletProvider !== "xumm"
                        ? "not-allowed"
                        : "pointer"
                    }
                    onClick={() => handleWalletAddressClick(wallet)}
                  >
                    {ellipsisAtCenter(wallet.address)}
                  </Text>
                </HStack>
              ))
            ) : (
              <Text fontSize="sm">-- --</Text>
            )}
            {wallets?.length > 2 && (
              <Link to={ROUTES.SETTINGS}>
                <Text fontSize="xs" textAlign="right" fontWeight="bold" mt={2}>
                  more
                </Text>
              </Link>
            )}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
}

export default AccountItem;
