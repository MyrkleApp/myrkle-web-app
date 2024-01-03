import { signIn } from "@/features/wallet/redux/wallet.slice";
import { ISignIn } from "@/features/wallet/types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCookie, useLocalStorage } from "react-use";
import { setUserToken } from "../redux/auth.slice";

function useRehydrateSignInData() {
  const [storedSignInData] = useLocalStorage<ISignIn>("sign-in-data");
  const [userTokenCookie] = useCookie("user-token");

  const dispatch = useDispatch();

  const _signIn = (data: ISignIn) => dispatch(signIn(data));
  const _setUserToken = (data: string) => dispatch(setUserToken(data));

  useEffect(() => {
    if (storedSignInData) {
      _signIn(storedSignInData);
    }
    if (userTokenCookie) {
      _setUserToken(userTokenCookie);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default useRehydrateSignInData;
