import { useState } from "react";
import MintTokenForm from "./mint-token-form";
import Manager from "./manager";
import { TMintTokenStep } from "../../types";
import Trustline from "./trustline";
import CreateToken from "./create-token";

function MintToken() {
  const [currentMintTokenStep, setCurrentMintTokenStep] = useState<TMintTokenStep>("form");

  // form
  const [tokenName, setTokenName] = useState("");
  const [amount, setAmount] = useState("");
  const [tickSize, setTickSize] = useState<null | number>(null);
  const [totalSupply, setTotalSupply] = useState("");
  const [domain, setDomain] = useState("");
  const [transferFee, setTransferFee] = useState("0");

  // manager
  const [managerAddress, setManagerAddress] = useState("");

  const handleTokenName = (value: string) => setTokenName(value);
  const handleAmount = (value: string) => setAmount(value);
  const handleTickSize = (value: number) => setTickSize(value);
  const handleTotalSupply = (value: string) => setTotalSupply(value);
  const handleDomain = (value: string) => setDomain(value);
  const handleTransferFee = (value: string) => setTransferFee(value);

  const handleManagerAddress = (value: string) => setManagerAddress(value);

  const handleMintTokenStep = (value: TMintTokenStep) => setCurrentMintTokenStep(value);

  // step one
  if (currentMintTokenStep === "form")
    return (
      <MintTokenForm
        tokenName={tokenName}
        amount={amount}
        tickSize={tickSize}
        totalSupply={totalSupply}
        domain={domain}
        transferFee={transferFee}
        handleTokenName={handleTokenName}
        handleAmount={handleAmount}
        handleTickSize={handleTickSize}
        handleTotalSupply={handleTotalSupply}
        handleDomain={handleDomain}
        handleTransferFee={handleTransferFee}
        handleMintTokenStep={handleMintTokenStep}
      />
    );

  // step two
  if (currentMintTokenStep === "manager")
    return (
      <Manager
        handleManagerAddress={handleManagerAddress}
        managerAddress={managerAddress}
        domain={domain}
        handleMintTokenStep={handleMintTokenStep}
      />
    );

  // step three
  if (currentMintTokenStep === "trustline") {
    return (
      <Trustline
        managerAddress={managerAddress}
        tokenName={tokenName}
        totalSupply={totalSupply}
        handleMintTokenStep={handleMintTokenStep}
      />
    );
  }

  // step four
  if (currentMintTokenStep === "create-token") {
    return (
      <CreateToken
        managerAddress={managerAddress}
        tokenName={tokenName}
        totalSupply={totalSupply}
        handleMintTokenStep={handleMintTokenStep}
      />
    );
  }

  return <></>;
}

export default MintToken;
