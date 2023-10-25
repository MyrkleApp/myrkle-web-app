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

export interface AccountItemProps {
  logo: React.ReactNode;
  wallets: IWalletAddress[];
  isActiveProvider: boolean;
  handleSelectedWallet: (walletAddress: IWalletAddress) => void;
}

function AccountItem({ logo, wallets, isActiveProvider, handleSelectedWallet }: AccountItemProps) {
  return (
    <AccordionItem
      border="none"
      bg={isActiveProvider ? "secondary" : "darker"}
      borderRadius="20px"
      mb={1}
    >
      <AccordionButton py="2px">
        <Box as="span" flex="1" textAlign="left" h="25px" overflow="hidden">
          {logo}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        {wallets?.length ? (
          wallets.map((wallet, i) => (
            <HStack key={i} mb={1}>
              <Text fontSize="2xs" cursor="pointer" onClick={() => handleSelectedWallet(wallet)}>
                {ellipsisAtCenter(wallet.address)}
              </Text>
            </HStack>
          ))
        ) : (
          <Text fontSize="sm">-- --</Text>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
}

export default AccountItem;
