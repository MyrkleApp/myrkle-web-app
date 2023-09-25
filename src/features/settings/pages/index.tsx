import Button from "@/components/button";
import Layout from "@/layout";
import { Box, Flex, HStack, Image, Spacer, Text } from "@chakra-ui/react";
import WalletAccordion from "../components/wallet-accordion";
import MyrkleLogoIcon from "@/icons/logo";
import XummLogoIcon from "@/icons/xumm-logo";
import crossmarkLogo from "@/assets/crossmark-logo.png";
import crossmarkText from "@/assets/crossmark-text.png";
import gemWalletLogo from "@/assets/gem-wallet-logo.png";
import PasswordItem from "../components/password-item";
import AddressBookItem from "../components/address-book-item";

function Settings() {
  return (
    <Layout>
      <Box p={5} h="100%" overflow="hidden auto">
        <Flex gap="30px">
          <Box w="35%">
            <HStack mb={5}>
              <Text className="font-face-proxima-nova-extrabld" fontSize="sm">
                My Wallet
              </Text>
              <Spacer />
              <Button h="30px">Add Wallet</Button>
            </HStack>
            <WalletAccordion wallet={<MyrkleLogoIcon fontSize="80px" />} />
            <Text fontSize="sm" fontWeight="bold" my={4}>
              External connected wallets
            </Text>
            <WalletAccordion mb={5} wallet={<XummLogoIcon fontSize="80px" />} />
            <WalletAccordion
              mb={5}
              wallet={
                <HStack cursor="pointer" w="fit-content">
                  <Image src={crossmarkLogo} alt="logo" h="20px" />
                  <Image src={crossmarkText} alt="logo" h="20px" />
                </HStack>
              }
            />
            <WalletAccordion
              wallet={
                <HStack cursor="pointer" w="fit-content">
                  <Image src={gemWalletLogo} alt="logo" h="20px" />
                  <Text fontWeight="bold" fontFamily="Inter">
                    GemWallet
                  </Text>
                </HStack>
              }
            />
          </Box>

          <Box w="65%">
            <HStack mb={5}>
              <Text className="font-face-proxima-nova-extrabld" fontSize="sm">
                Change Password
              </Text>
              <Spacer />
              <Button h="30px" w="130px" bg="#999999">
                save
              </Button>
            </HStack>

            <PasswordItem name="Old password" />
            <PasswordItem name="New password" />
            <PasswordItem name="Confirm New password" />

            <HStack my={7}>
              <Text className="font-face-proxima-nova-extrabld" fontSize="sm">
                Address book
              </Text>
              <Spacer />
              <Button h="30px" w="130px">
                add address
              </Button>
            </HStack>
            <AddressBookItem />
            <AddressBookItem />
            <AddressBookItem />
            <AddressBookItem />
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
}

export default Settings;
