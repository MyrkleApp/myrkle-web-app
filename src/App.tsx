import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Wallet from "./features/wallet/pages";
import Transaction from "./features/transactions/pages";
import NftGallery from "./features/wallet/pages/nft-gallery";
import NftDetail from "./features/wallet/pages/nft-detail";
import Terminal from "./features/terminal/pages";
import ROUTES from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.WALLET} element={<Wallet />} />
        <Route path={ROUTES.WALLET_NFT_GALLERY} element={<NftGallery />} />
        <Route path={ROUTES.WALLET_NFT_DETAIL} element={<NftDetail />} />
        <Route path={ROUTES.TRANSACTIONS} element={<Transaction />} />
        <Route path={ROUTES.TERMINAL} element={<Terminal />} />
        <Route path="/" element={<Navigate replace to={ROUTES.WALLET} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
