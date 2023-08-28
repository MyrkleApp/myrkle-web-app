import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Wallet from "./features/wallet/pages";
import Transaction from "./features/transactions/pages";
import NftGallery from "./features/wallet/pages/nft-gallery";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="wallet" element={<Wallet />} />
        <Route path="wallet/nft-gallery" element={<NftGallery />} />
        <Route path="transactions" element={<Transaction />} />
        <Route path="/" element={<Navigate replace to="/wallet" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
