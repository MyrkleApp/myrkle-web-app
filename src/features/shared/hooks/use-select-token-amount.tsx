import { useState } from "react";

function useSelectTokenAmount() {
  const [showTokenList, setShowTokenList] = useState(false);
  const [selectedToken, setSelectedToken] = useState<any>(null);
  const [amount, setAmount] = useState<number | string>("");

  const handleShowTokenList = (isOpen: boolean) => {
    setShowTokenList(isOpen);
  };

  const handleTokenClick = (token: any) => {
    setSelectedToken(token);
    setShowTokenList(false);
  };

  const handleAmount = (value: number | string) => setAmount(value);

  const handleReset = () => {
    setShowTokenList(false);
    setSelectedToken(null);
    setAmount("");
  };

  return [
    { showTokenList, selectedToken, amount },
    { handleShowTokenList, handleTokenClick, handleAmount, handleReset },
  ] as const;
}

export default useSelectTokenAmount;
