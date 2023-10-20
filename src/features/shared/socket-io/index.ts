import { io } from "socket.io-client";

const endpoint = "https://myrkle-signing.onrender.com";

export const socket = io(endpoint);

export const xummSignInJson = {
  txjson: {
    TransactionType: "SignIn",
  },
};
