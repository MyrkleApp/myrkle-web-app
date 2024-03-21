import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Wallet from "./features/wallet/pages";
import Transaction from "./features/transactions/pages";
import NftGallery from "./features/wallet/pages/nft-gallery";
import NftDetail from "./features/wallet/pages/nft-detail";
import Terminal from "./features/terminal/pages";
import ROUTES from "./routes";
import AssetManager from "./features/terminal/pages/asset-manager";
import NewAsset from "./features/terminal/pages/new-asset";
import AddAsset from "./features/terminal/pages/add-asset";
import Checks from "./features/terminal/pages/checks";
import CreatedChecks from "./features/terminal/pages/created-checks";
import CreatedEscrows from "./features/terminal/pages/created-escrows";
import Flags from "./features/terminal/pages/flags";
import Exchange from "./features/exchange/pages";
import Escrows from "./features/terminal/pages/escrows";
import BurnAsset from "./features/terminal/pages/burn-asset";
import Settings from "./features/settings/pages";
import useRehydrateSignInData from "./features/auth/hooks/use-rehydrate-signin-data";
import useRetrieveWallets from "./features/wallet/hooks/use-retrieve-wallets";
import UnderConstruction from "./components/under-construction";
import LandingPage from "./pages/landing";
// import useGenerateDeviceId from "./features/auth/hooks/use-generate-device-id";
// import useGetMe from "./features/auth/hooks/use-get-me";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import useRetrieveAddressBookList from "./features/wallet/hooks/use-retrieve-address-book";

function App() {
  // useGenerateDeviceId();
  // useGetMe();
  useRehydrateSignInData();
  useRetrieveWallets();
  useRetrieveAddressBookList();

  const [isLesserThanAllowedSize] = useMediaQuery("(max-width: 920px)");

  if (isLesserThanAllowedSize) {
    return <UnderConstruction />;
  }

  return (
    <Flex justify="center" align="center" bg="#000000" h="100vh" w="100vw">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to={ROUTES.WALLET} />} />
          <Route path={ROUTES.LANDING} element={<LandingPage />} />
          <Route path={ROUTES.WALLET} element={<Wallet />} />
          <Route path={ROUTES.WALLET_NFT_GALLERY} element={<NftGallery />} />
          <Route path={ROUTES.WALLET_NFT_DETAIL} element={<NftDetail />} />
          <Route path={ROUTES.TRANSACTIONS} element={<Transaction />} />
          <Route path={ROUTES.TERMINAL} element={<Terminal />} />
          <Route path={ROUTES.TERMINAL_ASSET_MANAGER} element={<AssetManager />} />
          <Route path={ROUTES.TERMINAL_NEW_ASSET} element={<NewAsset />} />
          <Route path={ROUTES.TERMINAL_ADD_ASSET} element={<AddAsset />} />
          <Route path={ROUTES.TERMINAL_BURN_ASSET} element={<BurnAsset />} />
          <Route path={ROUTES.TERMINAL_CHECKS} element={<Checks />} />
          <Route path={ROUTES.TERMINAL_CHECKS_CREATED_CHECKS} element={<CreatedChecks />} />
          <Route path={ROUTES.TERMINAL_ESCROWS} element={<Escrows />} />
          <Route path={ROUTES.TERMINAL_ESCROWS_CREATED_ESCROWS} element={<CreatedEscrows />} />
          <Route path={ROUTES.TERMINAL_FLAGS} element={<Flags />} />
          <Route path={ROUTES.EXCHANGE} element={<Exchange />} />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </Flex>
  );
}

export default App;
