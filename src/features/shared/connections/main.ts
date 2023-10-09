// const lib = require("xrpl-accountlib");
// const xrpl = require("xrpl");

// const generateWithMnemonic = () => {
//   let wallet = lib.generate.mnemonic();
//   return {
//     address: wallet.address,
//     publicKey: wallet.keypair.publicKey,
//     privateKey: wallet.keypair.privateKey,
//     mnemonic: wallet.secret.mnemonic,
//   };
// };

// const generateWithSeed = () => {
//   let wallet = lib.generate.familySeed();
//   console.log(wallet);
//   return {
//     address: wallet.address,
//     publicKey: wallet.keypair.publicKey,
//     privateKey: wallet.keypair.privateKey,
//     seed: wallet.secret.familySeed,
//   };
// };

// const generateWithSecretNumbers = () => {
//   let wallet = lib.generate.secretNumbers();
//   return {
//     address: wallet.address,
//     publicKey: wallet.keypair.publicKey,
//     privateKey: wallet.keypair.privateKey,
//     seed: wallet.secret.familySeed,
//     secretNumbers: wallet.secret.secretNumbers,
//   };
// };

// const deriveWithSeed = (seed) => {
//   let wallet = lib.derive.familySeed(seed);
//   return {
//     address: wallet.address,
//     publicKey: wallet.keypair.publicKey,
//     privateKey: wallet.keypair.privateKey,
//     seed: wallet.secret.familySeed,
//   };
// };

// const deriveWithMnemonic = (mnemonic) => {
//   let wallet = lib.derive.mnemonic(mnemonic);
//   return {
//     address: wallet.address,
//     publicKey: wallet.keypair.publicKey,
//     privateKey: wallet.keypair.privateKey,
//     mnemonic: wallet.secret.mnemonic,
//   };
// };

// const deriveWithSecretNumbers = (secretNumbers) => {
//   let wallet = lib.derive.secretNumbers(secretNumbers);
//   return {
//     address: wallet.address,
//     publicKey: wallet.keypair.publicKey,
//     privateKey: wallet.keypair.privateKey,
//     secretNumbers: wallet.secret.secretNumbers,
//     seed: wallet.secret.familySeed,
//   };
// };

// const deriveWithPrivateKey = (privateKey) => {
//   let wallet = lib.derive.privatekey(privateKey);
//   return {
//     address: wallet.address,
//     publicKey: wallet.keypair.publicKey,
//     privateKey: wallet.keypair.privateKey,
//   };
// };

// const isSeed = (seed) => {
//   return lib.utils.isValidSeed(seed);
// };

// const isAddress = (address) => {
//   return lib.utils.isValidAddress(address);
// };

// const isMnemonic = (mnemonic) => {
//   return lib.utils.isValidMnemnic(mnemonic);
// };

// const signAndSubmit = async (tx, publicKey, privatekey, network) => {
//   const TESTNET = "wss://s.altnet.rippletest.net:51233/";
//   const MAINNET = "wss://xrplcluster.com/";
//   const DEVNET = "wss://s.devnet.rippletest.net:51233/";
//   let wallet = new xrpl.Wallet(publicKey, privatekey);
//   const client = new xrpl.Client(
//     network.toLowerCase() === "testnet"
//       ? TESTNET
//       : network.toLowerCase() === "mainnet"
//       ? MAINNET
//       : DEVNET
//   );
//   await client.connect();
//   let preparedTxn = await client.autofill(tx);
//   let signed = wallet.sign(preparedTxn);
//   let result = await client.submitAndWait(signed.tx_blob);
//   await client.disconnect();
//   return {
//     hash: result.result.hash,
//     status:
//       result.result.meta.TransactionResult === "tesSUCCESS"
//         ? "SUCCESS"
//         : "FAIL",
//   };
// };
