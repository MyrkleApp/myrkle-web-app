import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { baseUrl } from "@/constants";
import axios from "axios";
import { setUserId, setUserToken, setUsername } from "../redux/auth.slice";
import { useCookie } from "react-use";

function useGetMe() {
  const [userTokenCookie] = useCookie("user-token");

  const dispatch = useDispatch();

  useEffect(() => {
    if (userTokenCookie) {
      dispatch(setUserToken(userTokenCookie));

      axios
        .get(`${baseUrl}/auth/user/`, { headers: { Authorization: `Token ${userTokenCookie}` } })
        .then((res) => {
          dispatch(setUserId(res.data.pk));
          dispatch(setUsername(res.data.username));
        })
        .catch((err) => console.log(err));
    }
  }, [userTokenCookie, dispatch]);

  return null;
}

export default useGetMe;
