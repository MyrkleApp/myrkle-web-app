import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Wallet from "./pages/wallet";
import Transaction from "./pages/transaction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="wallet" element={<Wallet />} />
        <Route path="transactions" element={<Transaction />} />
        <Route path="/" element={<Navigate replace to="/wallet" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
