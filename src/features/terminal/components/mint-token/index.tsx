import { useState } from "react";
import MintTokenForm from "./mint-token-form";
import Manager from "./manager";

function MintToken() {
  const [view] = useState<"form" | "manager">("manager");

  if (view === "form") return <MintTokenForm />;

  if (view === "manager") return <Manager />;

  return <div></div>;
}

export default MintToken;
