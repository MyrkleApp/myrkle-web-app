import { RootState } from "@/store";

export const selectUserToken = (state: RootState) => state.auth.userToken;
export const selectDeviceId = (state: RootState) => state.auth.deviceId;
export const selectUserId = (state: RootState) => state.auth.userId;
export const selectUserName = (state: RootState) => state.auth.username;
