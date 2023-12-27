import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAuthInitialState } from "../types";

const initialState: IAuthInitialState = {
  userToken: "",
  deviceId: "",
  isAuthUser: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserToken(state, { payload }: PayloadAction<string>) {
      state.userToken = payload;
    },
    setDeviceId(state, { payload }: PayloadAction<string>) {
      state.deviceId = payload;
    },
    setAuthUser(state, { payload }: PayloadAction<boolean>) {
      state.isAuthUser = payload;
    },
  },
});

export const { setUserToken, setDeviceId, setAuthUser } = authSlice.actions;

export default authSlice.reducer;
