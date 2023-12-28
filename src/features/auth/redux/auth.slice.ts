import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAuthInitialState } from "../types";

const initialState: IAuthInitialState = {
  userToken: "",
  deviceId: "",
  userId: null,
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
    setUserId(state, { payload }: PayloadAction<number>) {
      state.userId = payload;
    },
  },
});

export const { setUserToken, setDeviceId, setUserId } = authSlice.actions;

export default authSlice.reducer;
