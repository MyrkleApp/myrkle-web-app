import ShowSecretNumbers from "@/features/auth/components/secret-numbers/show-secret-numbers";
import Login from "@/features/auth/components/login";
import ShowSeed from "@/features/auth/components/seed/show-seed";
import CreateImportWallet from "@/features/auth/components/create-import-wallet";
import ShowMnemonic from "@/features/auth/components/mnemonic/show-mnemonic";
import CreateWalletOptions from "@/features/auth/components/create-wallet-options";
import SelectWalletProvider from "@/features/auth/components/select-wallet-provider";
import ADD_WALLET_PIPELINE from "@/features/auth/add-wallet-pipeline";
import ImportWalletOptions from "@/features/auth/components/import-wallet-options";
import ImportMnemonic from "@/features/auth/components/mnemonic/import-mnemonic";
import ImportSecretNumbers from "@/features/auth/components/secret-numbers/import-secret-numbers";
import ImportSeed from "@/features/auth/components/seed/import-seed";
import ImportPrivateKey from "@/features/auth/components/private-key/import-private-key";
import XummProvider from "@/features/auth/components/xumm-provider";
import HomeLayout from "@/layout/home-layout";
import CreatePassword from "@/features/auth/components/create-password";
import Backdrop from "@/components/backdrop";
import DialogBox from "@/components/dialog-box";
import useAddWallet from "@/features/shared/hooks/use-add-wallet";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "@/constants";
import { useDispatch } from "react-redux";
import { Text, useDisclosure, useToast } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import ROUTES from "@/routes";
import {
  setUserId,
  setUserToken,
  setUsername as setUsernameReduxStore,
} from "@/features/auth/redux/auth.slice";
import { useCookie, useDebounce } from "react-use";
import ResponseModal from "@/components/response-modal";
import Button from "@/components/button";
import ToastElement from "@/components/toast-element";
import ForgotPassword from "@/features/auth/components/forgot-password";
// import { useLazyGetMyWalletsQuery } from "@/features/shared/redux/xrp.api";
// import { formatMyWallets } from "@/helpers";
// import { setMyWallets } from "@/features/wallet/redux/wallet.slice";
// import { IWalletAddress } from "@/features/wallet/types";

function Auth() {
  // const navigate = useNavigate();

  const [, storeUserToken] = useCookie("user-token");

  const [
    { view, isDialogBoxOpen, dialogBoxMessage, qrCodeImage },
    { handleView, onCloseDialogBox, handleXummClick, handleCrossmarkClick, handleGemWalletClick },
  ] = useAddWallet();

  const dispatch = useDispatch();
  const _setUserToken = (token: string) => dispatch(setUserToken(token));
  const _setUserId = (id: number) => dispatch(setUserId(id));
  const _setUsernameReduxStore = (username: string) => dispatch(setUsernameReduxStore(username));
  // const _setMyWallets = (myWallets: IWalletAddress[]) => dispatch(setMyWallets(myWallets));

  // const [getMyWallets] = useLazyGetMyWalletsQuery();

  // registration
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isUsernameError, setUsernameError] = useState(false);
  const [isCheckUsernameLoading, setCheckUsernameLoading] = useState(false);
  const [recoveryKey, setRecoveryKey] = useState("recovery key goes here");

  const isValidUserame = !isUsernameError && !isCheckUsernameLoading;

  // login
  const [loginUsername, setLoginUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const {
    isOpen: isSuccessRegisterOpen,
    onOpen: onOpenSuccessRegister,
    onClose: onCloseSuccessRegister,
  } = useDisclosure();

  const {
    isOpen: isErrorResponseOpen,
    onOpen: onOpenErrorResponse,
    onClose: onCloseErrorResponse,
  } = useDisclosure();
  const { isOpen: isLoadingOpen, onOpen: onOpenLoading, onClose: onCloseLoading } = useDisclosure();

  const toast = useToast({
    position: "top",
    containerStyle: {
      width: "200px",
      display: "flex",
      justifyContent: "center",
    },
  });

  useDebounce(
    () => {
      setCheckUsernameLoading(true);

      axios
        .post(`${baseUrl}/auth/check-username/`, { username })
        .then((res) => {
          if (res.data) {
            setUsernameMessage("this username already exists");
            setUsernameError(true);
          } else {
            setUsernameMessage("");
            setUsernameError(false);
          }
          setCheckUsernameLoading(false);
        })
        .catch(() => {
          setCheckUsernameLoading(false);
        });

      setUsernameError(false);
    },
    500,
    [username],
  );

  const handleLoginUsernameChange = (e: any) => setLoginUsername(e.target.value);
  const handleUsernameChange = (e: any) => setUsername(e.target.value);
  const handlePassword1Change = (e: any) => setPassword1(e.target.value);
  const handlePassword2Change = (e: any) => setPassword2(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const handleRegister = () => {
    onOpenLoading();

    axios
      .post(`${baseUrl}/auth/registration/`, {
        username,
        password1,
        password2,
      })
      .then((res: any) => {
        // handleView(ADD_WALLET_PIPELINE.LOGIN);
        setUsernameMessage("");
        onCloseLoading();
        setRecoveryKey(res.data.recovery_key);
        onOpenSuccessRegister();
      })
      .catch((err) => {
        onCloseLoading();
        setErrorMessage(err.response.data.errors[0]?.detail);
        onOpenErrorResponse();
      });
  };

  const handleLogin = async () => {
    onOpenLoading();

    try {
      const res = await axios.post(`${baseUrl}/auth/login/`, {
        username: loginUsername,
        password,
      });

      onCloseLoading();
      setLoginMessage("");

      const token = res.data.key;

      _setUserToken(token);
      storeUserToken(token);

      const user = await axios.get(`${baseUrl}/auth/user/`, {
        headers: { Authorization: `Token ${token}` },
      });
      const userId = user.data.pk;
      _setUserId(userId);
      _setUsernameReduxStore(user.data.username);

      //   const myWalletsData = await getMyWallets({}).unwrap();
      //   const myFormattedWallets = formatMyWallets(myWalletsData.results);

      //   if (myFormattedWallets.length) {
      //     _setMyWallets(myFormattedWallets);
      //     navigate(ROUTES.WALLET);
      //   } else {
      //     handleView(ADD_WALLET_PIPELINE.WALLET_PROVIDER);
      //   }
    } catch (err: any) {
      onCloseLoading();
      setErrorMessage(err.response.data.errors[0]?.detail);
      onOpenErrorResponse();
    }
  };

  const handleCopyRecoveryKey = () => {
    navigator.clipboard?.writeText(recoveryKey);

    toast({
      render: () => <ToastElement />,
    });
  };

  return (
    <>
      <HomeLayout>
        {view === ADD_WALLET_PIPELINE.CREATE_PASSWORD && (
          <CreatePassword
            username={username}
            isValidUserame={isValidUserame}
            handleUsernameChange={handleUsernameChange}
            usernameMessage={
              <Text fontSize="xs" color="danger">
                {usernameMessage}
              </Text>
            }
            password1={password1}
            password2={password2}
            handlePassword1Change={handlePassword1Change}
            handlePassword2Change={handlePassword2Change}
            handleConfirmClick={handleRegister}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
            isLoading={isLoadingOpen}
            handleForgotPasswordClick={() => handleView(ADD_WALLET_PIPELINE.FORGOT_PASSWORD)}
          />
        )}
        {view === ADD_WALLET_PIPELINE.WALLET_PROVIDER && (
          <SelectWalletProvider
            handleMyrkleClick={() => {
              return;
              handleView(ADD_WALLET_PIPELINE.CREATE_IMPORT_WALLET);
            }}
            handleXummClick={handleXummClick}
            handleCrossmarkClick={handleCrossmarkClick}
            handleGemWalletClick={handleGemWalletClick}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
          />
        )}
        {view === ADD_WALLET_PIPELINE.CREATE_IMPORT_WALLET && (
          <CreateImportWallet
            handleBackArrowClick={() => handleView(ADD_WALLET_PIPELINE.WALLET_PROVIDER)}
            handleNewWalletClick={() => handleView(ADD_WALLET_PIPELINE.CREATE_WALLET_OPTIONS)}
            handleImportWalletClick={() => handleView(ADD_WALLET_PIPELINE.IMPORT_WALLET_OPTIONS)}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
          />
        )}
        {view === ADD_WALLET_PIPELINE.CREATE_WALLET_OPTIONS && (
          <CreateWalletOptions
            handleBackArrowClick={() => handleView(ADD_WALLET_PIPELINE.CREATE_IMPORT_WALLET)}
            handleMnemonicClick={() => handleView(ADD_WALLET_PIPELINE.CREATE_MNEMONIC)}
            handleSecretNumbersClick={() => handleView(ADD_WALLET_PIPELINE.CREATE_SECRET_NUMBERS)}
            handleSeedClick={() => handleView(ADD_WALLET_PIPELINE.CREATE_SEED)}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
          />
        )}
        {view === ADD_WALLET_PIPELINE.CREATE_MNEMONIC && (
          <ShowMnemonic
            handleBackArrowClick={() => handleView(ADD_WALLET_PIPELINE.CREATE_WALLET_OPTIONS)}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
          />
        )}
        {view === ADD_WALLET_PIPELINE.CREATE_SECRET_NUMBERS && (
          <ShowSecretNumbers
            handleBackArrowClick={() => handleView(ADD_WALLET_PIPELINE.CREATE_WALLET_OPTIONS)}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
          />
        )}
        {view === ADD_WALLET_PIPELINE.CREATE_SEED && (
          <ShowSeed
            handleBackArrowClick={() => handleView(ADD_WALLET_PIPELINE.CREATE_WALLET_OPTIONS)}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
          />
        )}

        {/* import */}
        {view === ADD_WALLET_PIPELINE.IMPORT_WALLET_OPTIONS && (
          <ImportWalletOptions
            handleBackArrowClick={() => handleView(ADD_WALLET_PIPELINE.CREATE_IMPORT_WALLET)}
            handleMnemonicClick={() => handleView(ADD_WALLET_PIPELINE.IMPORT_MNEMONIC)}
            handleSecretNumbersClick={() => handleView(ADD_WALLET_PIPELINE.IMPORT_SECRET_NUMBERS)}
            handleSeedClick={() => handleView(ADD_WALLET_PIPELINE.IMPORT_SEED)}
            handlePrivateKeyClick={() => handleView(ADD_WALLET_PIPELINE.IMPORT_PRIVATE_KEY)}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
          />
        )}
        {view === ADD_WALLET_PIPELINE.IMPORT_MNEMONIC && (
          <ImportMnemonic
            handleBackArrowClick={() => handleView(ADD_WALLET_PIPELINE.IMPORT_WALLET_OPTIONS)}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
          />
        )}
        {view === ADD_WALLET_PIPELINE.IMPORT_SECRET_NUMBERS && (
          <ImportSecretNumbers
            handleBackArrowClick={() => handleView(ADD_WALLET_PIPELINE.IMPORT_WALLET_OPTIONS)}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
          />
        )}
        {view === ADD_WALLET_PIPELINE.IMPORT_SEED && (
          <ImportSeed
            handleBackArrowClick={() => handleView(ADD_WALLET_PIPELINE.IMPORT_WALLET_OPTIONS)}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
          />
        )}
        {view === ADD_WALLET_PIPELINE.IMPORT_PRIVATE_KEY && (
          <ImportPrivateKey
            handleBackArrowClick={() => handleView(ADD_WALLET_PIPELINE.IMPORT_WALLET_OPTIONS)}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
          />
        )}
        {view === ADD_WALLET_PIPELINE.XUMM && (
          <XummProvider
            handleBackArrowClick={() => handleView(ADD_WALLET_PIPELINE.WALLET_PROVIDER)}
            handleLoginClick={() => handleView(ADD_WALLET_PIPELINE.LOGIN)}
            qrCode={qrCodeImage}
          />
        )}

        {view === ADD_WALLET_PIPELINE.LOGIN && (
          <Login
            username={loginUsername}
            handleUsernameChange={handleLoginUsernameChange}
            password={password}
            message={loginMessage}
            handlePasswordChange={handlePasswordChange}
            handleRegisterClick={() => handleView(ADD_WALLET_PIPELINE.CREATE_PASSWORD)}
            isLoading={isLoadingOpen}
            handleLoginClick={handleLogin}
            handleForgotPasswordClick={() => handleView(ADD_WALLET_PIPELINE.FORGOT_PASSWORD)}
          />
        )}

        {view === ADD_WALLET_PIPELINE.FORGOT_PASSWORD && <ForgotPassword handleView={handleView} />}
      </HomeLayout>

      <Backdrop isOpen={isSuccessRegisterOpen} w="100vw" h="100vh" borderRadius="0" top={0}>
        <DialogBox handleClose={onCloseSuccessRegister} w="350px" h="280px">
          <Text fontWeight="bold">This is your recovery key!</Text>
          <Text fontSize="xs">
            Ensure to back it up to restore your account or else you will lose access to it forever.
          </Text>
          <Text
            fontSize="xs"
            bg="secondary"
            p="10px 15px"
            mt="20px"
            borderRadius="7px"
            cursor="pointer"
            textAlign="center" // PXBTWE9 sammy3
            onClick={handleCopyRecoveryKey}
          >
            {recoveryKey}
          </Text>
          <Text fontSize="2xs" textAlign="center">
            click to copy
          </Text>
          <Button
            mt="25px"
            w="100%"
            onClick={() => {
              handleView(ADD_WALLET_PIPELINE.LOGIN);
              onCloseSuccessRegister();
            }}
          >
            I have backed up my recovery key
          </Button>
        </DialogBox>
      </Backdrop>

      <Backdrop isOpen={isDialogBoxOpen} w="100vw" h="100vh" borderRadius="0" top={0}>
        <DialogBox handleClose={onCloseDialogBox} message={dialogBoxMessage} />
      </Backdrop>

      <Backdrop isOpen={isErrorResponseOpen} w="100vw" h="100vh" borderRadius="0" top={0}>
        <ResponseModal isError={true} message={errorMessage} handleClose={onCloseErrorResponse} />
      </Backdrop>
    </>
  );
}

export default Auth;
