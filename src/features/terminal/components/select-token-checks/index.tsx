import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import TokenDetail from "./token-detail";
import SelectTokenDropdown from "../select-token-dropdown";
import { useSearchParams } from "react-router-dom";
import { IToken } from "@/features/shared/types";

function SelectTokenChecks() {
  const [searchParams] = useSearchParams();
  const urlTokenName = searchParams.get("token");
  const urlTokenIssuer = searchParams.get("issuer");

  const [view, setView] = useState<"list" | "detail">("list");
  const [token, setToken] = useState<Partial<IToken> | null>(null);

  useEffect(() => {
    if (urlTokenName && urlTokenIssuer) {
      setToken({ token: urlTokenName, issuer: urlTokenIssuer });
      setView("detail");
    }
  }, [urlTokenIssuer, urlTokenName]);

  const handleTokenClick = (token: any) => {
    setView("detail");
    setToken(token);
  };

  const handleClearSelectedToken = () => {
    setView("list");
    setToken(null);
  };

  return (
    <AnimatePresence>
      {view === "list" && <SelectTokenDropdown handleTokenClick={handleTokenClick} />}

      {view === "detail" && (
        <TokenDetail token={token} handleTokenClick={handleClearSelectedToken} />
      )}
    </AnimatePresence>
  );
}

export default SelectTokenChecks;
