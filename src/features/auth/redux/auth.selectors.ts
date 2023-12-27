import { RootState } from "@/store";

export const selectUserToken = (state: RootState) => state.auth.userToken;
export const selectDeviceId = (state: RootState) => state.auth.deviceId;
export const selectIsAuthUser = (state: RootState) => state.auth.isAuthUser;
