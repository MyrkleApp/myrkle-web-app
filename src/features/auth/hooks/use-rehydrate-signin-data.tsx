import { signIn } from "@/features/wallet/redux/wallet.slice";
import { ISignIn } from "@/features/wallet/types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "react-use";

function useRehydrateSignInData() {
  const [storedSignInData] = useLocalStorage<ISignIn>("sign-in-data");

  const dispatch = useDispatch();

  const _signIn = (data: ISignIn) => dispatch(signIn(data));

  useEffect(() => {
    if (storedSignInData) {
      _signIn(storedSignInData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default useRehydrateSignInData;
