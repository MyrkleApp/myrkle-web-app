import { io } from "socket.io-client";

const endpoint = "https://xaman.myrkle.app/";

export const socket = io(endpoint);

export const xummSignInJson = {
  txjson: {
    TransactionType: "SignIn",
  },
};
