import { io } from "socket.io-client";

const endpoint = "https://xamm-xumm-connect.onrender.com";

export const socket = io(endpoint);

export const xummSignInJson = {
  txjson: {
    TransactionType: "SignIn",
  },
};
