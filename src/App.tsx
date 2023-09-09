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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.WALLET} element={<Wallet />} />
        <Route path={ROUTES.WALLET_NFT_GALLERY} element={<NftGallery />} />
        <Route path={ROUTES.WALLET_NFT_DETAIL} element={<NftDetail />} />
        <Route path={ROUTES.TRANSACTIONS} element={<Transaction />} />
        <Route path={ROUTES.TERMINAL} element={<Terminal />} />
        <Route path={ROUTES.TERMINAL_ASSET_MANAGER} element={<AssetManager />} />
        <Route path={ROUTES.TERMINAL_NEW_ASSET} element={<NewAsset />} />
        <Route path={ROUTES.TERMINAL_ADD_ASSET} element={<AddAsset />} />
        <Route path={ROUTES.TERMINAL_CHECKS} element={<Checks />} />
        <Route path={ROUTES.TERMINAL_CHECKS_CREATED_CHECKS} element={<CreatedChecks />} />
        <Route path={ROUTES.TERMINAL_ESCROWS_CREATED_ESCROWS} element={<CreatedEscrows />} />
        <Route path="/" element={<Navigate replace to={ROUTES.WALLET} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
