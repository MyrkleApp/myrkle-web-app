import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import TokenDetail from "./token-detail";
import SelectTokenDropdown from "../select-token-dropdown";

function SelectTokenChecks() {
  const [view, setView] = useState<"list" | "detail">("list");
  const [token, setToken] = useState<any>(null);

  const handleTokenClick = (token: any) => {
    setView("detail");
    setToken(token);
  };

  return (
    <AnimatePresence>
      {view === "list" && <SelectTokenDropdown handleTokenClick={handleTokenClick} />}

      {view === "detail" && <TokenDetail token={token} />}
    </AnimatePresence>
  );
}

export default SelectTokenChecks;
