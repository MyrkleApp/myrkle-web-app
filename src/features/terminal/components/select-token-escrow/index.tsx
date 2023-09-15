import { useState } from "react";
import Dropdown from "./dropdown";
import { AnimatePresence } from "framer-motion";
import TokenDetail from "./token-detail";

function SelectTokenEscrow() {
  const [view, setView] = useState<"list" | "detail">("list");

  const handleTokenClick = () => {
    setView("detail");
  };

  return (
    <AnimatePresence>
      {view === "list" && <Dropdown handleTokenClick={handleTokenClick} />}

      {view === "detail" && <TokenDetail />}
    </AnimatePresence>
  );
}

export default SelectTokenEscrow;
