import { useDispatch, useSelector } from "react-redux";
import { selectUserToken } from "../redux/auth.selectors";
import { useEffect } from "react";
import { baseUrl } from "@/constants";
import axios from "axios";
import { setUserId } from "../redux/auth.slice";

function useGetMe() {
  const userToken = useSelector(selectUserToken);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userToken) {
      axios
        .get(`${baseUrl}/auth/user/`, { headers: { Authorization: `Token ${userToken}` } })
        .then((res) => {
          dispatch(setUserId(res.data.pk));
        })
        .catch((err) => console.log(err));
    }
  }, [userToken, dispatch]);

  return null;
}

export default useGetMe;
