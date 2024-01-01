import { SimpleGrid } from "@chakra-ui/react";
import FlagCard from "./flag-card";
import {
  // useAccountTxnIdMutation,
  useDefaultRippleMutation,
  useDisableMasterMutation,
  useDisallowIncomingCheckMutation,
  useDisallowIncomingNftTokenOfferMutation,
  useDisallowIncomingPayChanMutation,
  useDisallowIncomingTrustlineMutation,
  useDisallowXrpMutation,
  useGetAccountInfoQuery,
  useGlobalFreezeMutation,
  useLazyParseAccountFlagQuery,
  useNoFreezeMutation,
  useRequireAuthMutation,
  useRequireDestMutation,
} from "@/features/shared/redux/xrp.api";
import { selectAddress, selectNet } from "@/features/wallet/redux/wallet.selectors";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import Backdrop from "@/components/backdrop";
import MyrkleLoader from "@/components/myrkle-loader";
import { TTxnPipeline } from "@/features/shared/types";
import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import ResponseModal from "@/components/response-modal";
import XummTxnModal from "@/components/xumm-txn-modal";

const isFlagEnabled = (list: any[], flagTitle: string) => {
  const isEnabled = list?.findIndex((flag) => flag.flagname === flagTitle);
  if (isEnabled === -1) return false;
  else return true;
};

const allFlags = [
  "lsfDefaultRipple",
  "lsfDisableMaster",
  "lsfDisallowIncomingCheck",
  "lsfDisallowIncomingNFTokenOffer",
  "lsfDisallowIncomingPayChannel",
  "lsfDisallowIncomingTrustline",
  "lsfDisallowXRP",
  "lsfGlobalFreeze",
  "lsfNoFreeze",
  "lsfRequireAuth",
  "lsfRequireDestTag",
];

function ListFlags() {
  const net = useSelector(selectNet);
  const address = useSelector(selectAddress);

  const {
    data: accountInfo,
    isLoading: isAccountInfoLoading,
    isFetching: isAccountInfoFetching,
  } = useGetAccountInfoQuery({ address, net }, { refetchOnMountOrArgChange: true });

  const [
    parseAccountFlags,
    { data: accountFlags, isLoading: isAccountFlagLoading, isFetching: isAccountFlagFetching },
  ] = useLazyParseAccountFlagQuery();

  const [view, setView] = useState<TTxnPipeline>("default");

  const [
    { isSubmitTxnSuccess, xummTxnQrCode, submitTxnResponseMsg },
    { handleSubmitTxn, resetSubmitTxnResponse },
  ] = useSubmitTxn("flag");

  const [flags, setFlags] = useState<any>({
    lsfDefaultRipple: false,
    lsfDisableMaster: false,
    lsfDisallowIncomingCheck: false,
    lsfDisallowIncomingNFTokenOffer: false,
    lsfDisallowIncomingPayChannel: false,
    lsfDisallowIncomingTrustline: false,
    lsfDisallowXRP: false,
    lsfGlobalFreeze: false,
    lsfNoFreeze: false,
    lsfRequireAuth: false,
    lsfRequireDestTag: false,
  });

  const [lastUpdatedFlagTitle, setLastUpdatedFlagTitle] = useState("");
  const [lastUpdatedFlagValue, setLastUpdatedFlagValue] = useState(false);

  const [defaultRipple] = useDefaultRippleMutation();
  const [disableMaster] = useDisableMasterMutation();
  const [disallowIncomingCheck] = useDisallowIncomingCheckMutation();
  const [disallowIncomingNftTokenOffer] = useDisallowIncomingNftTokenOfferMutation();
  const [disallowIncomingPayChan] = useDisallowIncomingPayChanMutation();
  const [disallowIncomingTrustline] = useDisallowIncomingTrustlineMutation();
  const [disallowXrp] = useDisallowXrpMutation();
  const [globalFreeze] = useGlobalFreezeMutation();
  const [noFreeze] = useNoFreezeMutation();
  const [requireAuth] = useRequireAuthMutation();
  const [requireDest] = useRequireDestMutation();

  const checkIsFlagEnabled = useCallback(
    (flagTitle: string) => {
      return isFlagEnabled(accountFlags, flagTitle);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(accountFlags)],
  );

  useEffect(() => {
    if (String(accountInfo?.flags)) {
      parseAccountFlags(accountInfo?.flags)
        .unwrap()
        .then(() => {
          allFlags.forEach((flag) => {
            const isEnabled = checkIsFlagEnabled(flag);
            setFlags((prevValue: any) => {
              return { ...prevValue, [flag]: isEnabled };
            });
          });
        });
    }
  }, [accountInfo?.flags, checkIsFlagEnabled, parseAccountFlags]);

  useEffect(() => {
    if (xummTxnQrCode) {
      setView("xumm-qr-code");
    }
  }, [xummTxnQrCode]);

  useEffect(() => {
    if (isSubmitTxnSuccess === null) return;

    if (isSubmitTxnSuccess) {
      setView("success");

      setFlags((prevValue: any) => {
        return { ...prevValue, [lastUpdatedFlagTitle]: lastUpdatedFlagValue };
      });
    } else setView("error-2");
  }, [
    accountInfo?.flags,
    isSubmitTxnSuccess,
    lastUpdatedFlagTitle,
    lastUpdatedFlagValue,
    parseAccountFlags,
  ]);

  const handleToggleFlag = (flagTitle: string, mutation: any) => {
    setView("loading");

    const newFlagState = !flags[flagTitle];

    setLastUpdatedFlagTitle(flagTitle);
    setLastUpdatedFlagValue(newFlagState);

    mutation({ sender_addr: address, state: newFlagState })
      .unwrap()
      .then((res: any) => {
        handleSubmitTxn(res);
      })
      .catch(() => {
        setView("error-1");
      });
  };

  const handleClose = () => {
    setView("default");
    resetSubmitTxnResponse();
  };

  return (
    <>
      <SimpleGrid w="85%" h="100%" columns={[1, null, 2, 3]} spacing="50px">
        <FlagCard
          title="lsfDefaultRipple"
          description="enable rippling on this address's trust lines by default. Required for issuing addresses; discouraged for others"
          isChecked={flags.lsfDefaultRipple}
          handleSwitchClick={() => handleToggleFlag("lsfDefaultRipple", defaultRipple)}
        />
        <FlagCard
          title="lsfDisableMaster"
          description="Disallows use of the master key to sign transactions for this account"
          isChecked={flags.lsfDisableMaster}
          handleSwitchClick={() => handleToggleFlag("lsfDisableMaster", disableMaster)}
        />
        <FlagCard
          title="lsfDisallowIncomingCheck"
          description="To block incoming check"
          isChecked={flags.lsfDisallowIncomingCheck}
          handleSwitchClick={() =>
            handleToggleFlag("lsfDisallowIncomingCheck", disallowIncomingCheck)
          }
          isDisabled
        />
        <FlagCard
          title="lsfDisallowIncomingNFTokenOffer"
          description="To block incoming nftoken offers"
          isChecked={flags.lsfDisallowIncomingNFTokenOffer}
          handleSwitchClick={() =>
            handleToggleFlag("lsfDisallowIncomingNFTokenOffer", disallowIncomingNftTokenOffer)
          }
          isDisabled
        />
        <FlagCard
          title="lsfDisallowIncomingPayChannel"
          description="To block incoming pay channels"
          isChecked={flags.lsfDisallowIncomingPayChannel}
          handleSwitchClick={() =>
            handleToggleFlag("lsfDisallowIncomingPayChannel", disallowIncomingPayChan)
          }
          isDisabled
        />
        <FlagCard
          title="lsfDisallowIncomingTrustline"
          description="To block incoming trustline"
          isChecked={flags.lsfDisallowIncomingTrustline}
          handleSwitchClick={() =>
            handleToggleFlag("lsfDisallowIncomingTrustline", disallowIncomingTrustline)
          }
          isDisabled
        />
        <FlagCard
          title="lsfDisallowXRP"
          description="Client applications should not send xrp to this account. Not enforced by ripple."
          isChecked={flags.lsfDisallowXRP}
          handleSwitchClick={() => handleToggleFlag("lsfDisallowXRP", disallowXrp)}
        />
        <FlagCard
          title="lsfGlobalFreeze"
          description="All assets issued by this address are frozen"
          isChecked={flags.lsfGlobalFreeze}
          handleSwitchClick={() => handleToggleFlag("lsfGlobalFreeze", globalFreeze)}
        />
        <FlagCard
          title="lsfNoFreeze"
          description="This address cannot freeze trustlines connected to it. Once enabled, cannot be disabled."
          isChecked={flags.lsfNoFreeze}
          handleSwitchClick={() => handleToggleFlag("lsfNoFreeze", noFreeze)}
        />
        <FlagCard
          title="lsfRequireAuth"
          description="This account must individually aprove other users for those users to hold this account's tokens"
          isChecked={flags.lsfRequireAuth}
          handleSwitchClick={() => handleToggleFlag("lsfRequireAuth", requireAuth)}
        />
        <FlagCard
          title="lsfRequireDestTag"
          description="Requires incoming payments to specify a destination tag"
          isChecked={flags.lsfRequireDestTag}
          handleSwitchClick={() => handleToggleFlag("lsfRequireDestTag", requireDest)}
        />
      </SimpleGrid>
      <Backdrop
        isOpen={
          isAccountInfoLoading ||
          isAccountInfoFetching ||
          isAccountFlagLoading ||
          isAccountFlagFetching
        }
      >
        <MyrkleLoader />
      </Backdrop>

      <Backdrop isOpen={view !== "default"}>
        {view === "loading" && <MyrkleLoader />}

        {view === "error-1" && (
          <ResponseModal isError={true} message="Something went wrong" handleClose={handleClose} />
        )}

        {view === "xumm-qr-code" && (
          <XummTxnModal qrCodeImage={xummTxnQrCode} handleClose={handleClose} />
        )}

        {view === "error-2" && (
          <ResponseModal isError={true} message={submitTxnResponseMsg} handleClose={handleClose} />
        )}

        {view === "success" && <ResponseModal isError={false} handleClose={handleClose} />}
      </Backdrop>
    </>
  );
}

export default ListFlags;
