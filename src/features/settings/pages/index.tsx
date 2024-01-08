import Layout from "@/layout";
import {
  Box,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import ListWalletProviders from "../components/list-wallet-providers";
import AddWallet from "../components/add-wallet";
import ChangePassword from "../components/change-password";
import AddAddress from "../components/add-address";
import ListAddressBook from "../components/list-address-book";
import LogoutIcon from "@/icons/logout";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/routes";
import { useCookie } from "react-use";
import { useDispatch } from "react-redux";
import { setUserToken } from "@/features/auth/redux/auth.slice";
import { setMyWallets } from "@/features/wallet/redux/wallet.slice";

function Settings() {
  const navigate = useNavigate();

  const [, , clearUserToken] = useCookie("user-token");

  const dispatch = useDispatch();
  const _setUserToken = (userToken: string) => dispatch(setUserToken(userToken));
  const _clearMyWallets = () => dispatch(setMyWallets([]));

  const handleLogout = () => {
    navigate(ROUTES.AUTH);
    clearUserToken();
    _setUserToken("");
    _clearMyWallets();
  };

  return (
    <Layout>
      <Flex justify="flex-end" pr={3}>
        <Menu>
          <MenuButton>
            <LogoutIcon fill="#fff" fontSize="2xl" />
          </MenuButton>
          <MenuList bg="darker" border="none" minW="150px">
            <MenuItem bg="dark" onClick={handleLogout}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Box p={5} mt="10px" h="calc(100% - 40px)" overflow="hidden auto">
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
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
}

export default Settings;
