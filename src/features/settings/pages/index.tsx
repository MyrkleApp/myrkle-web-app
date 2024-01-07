import Layout from "@/layout";
import { Box, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import ListWalletProviders from "../components/list-wallet-providers";
import AddWallet from "../components/add-wallet";
import ChangePassword from "../components/change-password";
import AddAddress from "../components/add-address";
import ListAddressBook from "../components/list-address-book";

function Settings() {
  return (
    <Layout>
      <Box p={5} h="100%" overflow="hidden auto">
        <Flex gap="30px" direction={["column", null, null, "row"]}>
          <Box w={["100%", null, null, "35%"]}>
            <HStack mb={5}>
              <Text className="font-face-proxima-nova-extrabld" fontSize="md">
                My Wallet
              </Text>
              <Spacer />
              <AddWallet />
            </HStack>
            <ListWalletProviders />
          </Box>

          <Box w={["100%", null, null, "65%"]}>
            <ChangePassword />

            <HStack my={7}>
              <Text className="font-face-proxima-nova-extrabld" fontSize="sm">
                Address book
              </Text>
              <Spacer />
              <AddAddress />
            </HStack>

            <ListAddressBook />

            {/* <Text fontSize="sm">We could not find any addresses in your address book.</Text> */}

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
