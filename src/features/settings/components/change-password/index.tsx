import Button from "@/components/button";
import { HStack, Spacer, Text, useToast } from "@chakra-ui/react";
import PasswordItem from "../password-item";
import { useState } from "react";
import axios from "axios";
import { baseUrl, passwordRegex } from "@/constants";
import ToastElement from "@/components/toast-element";
import { useSelector } from "react-redux";
import { selectUserToken } from "@/features/auth/redux/auth.selectors";

function ChangePassword() {
  const userToken = useSelector(selectUserToken);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [isChangePasswordLoading, setIsChangePasswordLoading] = useState(false);

  const isNewPassword1Valid = newPassword1.match(passwordRegex);
  const isNewPassword2Valid = newPassword1 === newPassword2;
  const isSubmitEnabled = oldPassword.trim() && isNewPassword1Valid && isNewPassword2Valid;

  const toast = useToast({
    position: "top",
    containerStyle: {
      // ml: "350px",
      w: "300px",
    },
  });

  const resetData = () => {
    setIsChangePasswordLoading(false);
    setOldPassword("");
    setNewPassword1("");
    setNewPassword2("");
  };

  const handleChangePassword = () => {
    setIsChangePasswordLoading(true);

    const body = {
      old_password: oldPassword,
      new_password1: newPassword1,
      new_password2: newPassword2,
    };

    const headers = { headers: { Authorization: `Token ${userToken}` } };

    axios
      .post(`${baseUrl}/auth/password/change/`, body, headers)
      .then(() => {
        resetData();

        toast({
          render: () => (
            <ToastElement bg="success" w="250px" fontWeight="bold" fontSize="lg">
              Password changed successfully
            </ToastElement>
          ),
        });
      })
      .catch(() => {
        resetData();

        toast({
          render: () => (
            <ToastElement bg="danger" w="250px" fontWeight="bold" fontSize="lg">
              Sorry, an error occurred!
            </ToastElement>
          ),
        });
      });
  };

  return (
    <>
      <HStack mb={5}>
        <Text className="font-face-proxima-nova-extrabld" fontSize="md">
          Change Password
        </Text>
        <Spacer />
        <Button
          h="30px"
          w="130px"
          bg={isSubmitEnabled ? "primary" : "#999999"}
          onClick={handleChangePassword}
          isDisabled={!isSubmitEnabled}
          isLoading={isChangePasswordLoading}
        >
          save
        </Button>
      </HStack>

      <PasswordItem
        name="Old password"
        value={oldPassword}
        handleChange={(e: any) => setOldPassword(e.target.value)}
      />
      {newPassword1 && !isNewPassword1Valid && (
        <Text fontSize="xs" color="danger">
          Your password must contain at least one lowercase, uppercase, one digit, and one special
          character.
        </Text>
      )}
      <PasswordItem
        name="New password"
        value={newPassword1}
        handleChange={(e: any) => setNewPassword1(e.target.value)}
      />
      {newPassword2 && !isNewPassword2Valid && (
        <Text fontSize="xs" color="danger">
          Passwords must match
        </Text>
      )}
      <PasswordItem
        name="Confirm New password"
        value={newPassword2}
        handleChange={(e: any) => setNewPassword2(e.target.value)}
      />
    </>
  );
}

export default ChangePassword;
