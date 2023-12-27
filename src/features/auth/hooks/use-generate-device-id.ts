import { useEffect } from "react";
import generateDeviceId from "../helpers/generate-device-id";
import { useDispatch } from "react-redux";
import { setDeviceId } from "../redux/auth.slice";

function useGenerateDeviceId() {
  const generatedDeviceId = generateDeviceId();

  const dispatch = useDispatch();

  useEffect(() => {
    if (generatedDeviceId) {
      dispatch(setDeviceId(generatedDeviceId));
    }
  }, [dispatch, generatedDeviceId]);

  return null;
}

export default useGenerateDeviceId;
