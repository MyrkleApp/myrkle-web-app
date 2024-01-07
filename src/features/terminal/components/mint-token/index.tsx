import { useState } from "react";
import MintTokenForm from "./mint-token-form";
import Manager from "./manager";
import { TMintTokenStep } from "../../types";
import Trustline from "./trustline";
import CreateToken from "./create-token";
import Issuer from "./issuer";
import { TWalletProvider } from "@/features/wallet/types";

function MintToken() {
  const [currentMintTokenStep, setCurrentMintTokenStep] = useState<TMintTokenStep>("form");

  // form
  const [tokenName, setTokenName] = useState("");
  const [tickSize, setTickSize] = useState<null | number>(null);
  const [totalSupply, setTotalSupply] = useState("");
  const [domain, setDomain] = useState("");
  const [transferFee, setTransferFee] = useState("0");

  // issuer
  const [issuerAddress, setIssuerAddress] = useState("");
  const [issuerWalletProvider, setIssuerWalletProvider] = useState<TWalletProvider | "">("");

  // manager
  const [managerAddress, setManagerAddress] = useState("");
  const [managerWalletProvider, setManagerWalletProvider] = useState<TWalletProvider | "">("");

  const handleTokenName = (value: string) => setTokenName(value);
  const handleTickSize = (value: number) => setTickSize(value);
  const handleTotalSupply = (value: string) => setTotalSupply(value);
  const handleDomain = (value: string) => setDomain(value);
  const handleTransferFee = (value: string) => setTransferFee(value);

  const handleIssuerAddress = (value: string) => setIssuerAddress(value);
  const handleIssuerWalletProvider = (value: TWalletProvider) => setIssuerWalletProvider(value);

  const handleManagerAddress = (value: string) => setManagerAddress(value);
  const handleManagerWalletProvider = (value: TWalletProvider) => setManagerWalletProvider(value);

  const handleMintTokenStep = (value: TMintTokenStep) => setCurrentMintTokenStep(value);

  const clearMintTokenState = () => {
    setTokenName("");
    setTickSize(null);
    setTotalSupply("");
    setDomain("");
    setTransferFee("0");
    setIssuerAddress("");
    setIssuerWalletProvider("");
    setManagerAddress("");
    setManagerWalletProvider("");
  };

  // step one
  if (currentMintTokenStep === "form")
    return (
      <MintTokenForm
        tokenName={tokenName}
        tickSize={tickSize}
        totalSupply={totalSupply}
        domain={domain}
        transferFee={transferFee}
        handleTokenName={handleTokenName}
        handleTickSize={handleTickSize}
        handleTotalSupply={handleTotalSupply}
        handleDomain={handleDomain}
        handleTransferFee={handleTransferFee}
        handleMintTokenStep={handleMintTokenStep}
      />
    );

  // step two
  if (currentMintTokenStep === "issuer")
    return (
      <Issuer
        handleIssuerAddress={handleIssuerAddress}
        issuerAddress={issuerAddress}
        domain={domain}
        handleMintTokenStep={handleMintTokenStep}
        tickSize={tickSize}
        transferFee={transferFee}
        issuerWalletProvider={issuerWalletProvider as TWalletProvider}
        handleIssuerWalletProvider={handleIssuerWalletProvider}
      />
    );

  // step three
  if (currentMintTokenStep === "manager")
    return (
      <Manager
        handleManagerAddress={handleManagerAddress}
        managerAddress={managerAddress}
        issuerAddress={issuerAddress}
        domain={domain}
        handleMintTokenStep={handleMintTokenStep}
        managerWalletProvider={managerWalletProvider as TWalletProvider}
        handleManagerWalletProvider={handleManagerWalletProvider}
      />
    );

  // step four
  if (currentMintTokenStep === "trustline") {
    return (
      <Trustline
        issuerAddress={issuerAddress}
        managerAddress={managerAddress}
        tokenName={tokenName}
        totalSupply={totalSupply}
        managerWalletProvider={managerWalletProvider as TWalletProvider}
        handleMintTokenStep={handleMintTokenStep}
      />
    );
  }

  // step five
  if (currentMintTokenStep === "create-token") {
    return (
      <CreateToken
        issuerAddress={issuerAddress}
        managerAddress={managerAddress}
        tokenName={tokenName}
        totalSupply={totalSupply}
        issuerWalletProvider={issuerWalletProvider as TWalletProvider}
        handleMintTokenStep={handleMintTokenStep}
        clearMintTokenState={clearMintTokenState}
      />
    );
  }

  return <></>;
}

export default MintToken;
