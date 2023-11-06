import Button from "@/components/button";
import Layout from "@/layout";
import { Box, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import PasswordItem from "../components/password-item";
// import AddressBookItem from "../components/address-book-item";
import ListWalletProviders from "../components/list-wallet-providers";
import AddWallet from "../components/add-wallet";

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
              <AddWallet />
            </HStack>
            <ListWalletProviders />
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

            <Text fontSize="sm">We could not find any addresses in your address book.</Text>

            {/* <AddressBookItem />
            <AddressBookItem />
            <AddressBookItem />
            <AddressBookItem /> */}
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
}

export default Settings;
