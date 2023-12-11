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
import { useEffect, useState } from "react";
import Backdrop from "@/components/backdrop";
import MyrkleLoader from "@/components/myrkle-loader";

const isFlagEnabled = (list: any[], flagTitle: string) => {
  const isEnabled = list?.findIndex((flag) => flag.flagname === flagTitle);
  if (isEnabled === -1) return false;
  else return true;
};

function ListFlags() {
  const [lastAlteredFlag, setLastAlteredFlag] = useState("");

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

  useEffect(() => {
    if (String(accountInfo?.flags)) {
      parseAccountFlags(accountInfo?.flags);
    }
  }, [accountInfo?.flags, parseAccountFlags]);

  const handleLastAlteredFlag = (flagTitle: string) => {
    setLastAlteredFlag(flagTitle);
  };

  return (
    <>
      <SimpleGrid w="85%" h="100%" columns={[1, null, 2, 3]} spacing="50px">
        {/* <FlagCard
        title="Account transaction id"
        description="Flag description"
        mutation={accountTxnId}
      />
      <FlagCard title="Auth nft token minter" description="Flag description" /> */}
        <FlagCard
          title="lsfDefaultRipple"
          description="enable rippling on this address's trust lines by default. Required for issuing addresses; discouraged for others"
          mutation={defaultRipple}
          currentValue={isFlagEnabled(accountFlags, "lsfDefaultRipple")}
          lastAlteredFlag={lastAlteredFlag}
          handleLastAlteredFlag={handleLastAlteredFlag}
        />
        <FlagCard
          title="lsfDisableMaster"
          description="Disallows use of the master key to sign transactions for this account"
          mutation={disableMaster}
          currentValue={isFlagEnabled(accountFlags, "lsfDisableMaster")}
          lastAlteredFlag={lastAlteredFlag}
          handleLastAlteredFlag={handleLastAlteredFlag}
        />
        <FlagCard
          title="lsfDisallowIncomingCheck"
          description="To block incoming check"
          mutation={disallowIncomingCheck}
          currentValue={isFlagEnabled(accountFlags, "lsfDisallowIncomingCheck")}
          lastAlteredFlag={lastAlteredFlag}
          handleLastAlteredFlag={handleLastAlteredFlag}
        />
        <FlagCard
          title="lsfDisallowIncomingNFTokenOffer"
          description="To block incoming nftoken offers"
          mutation={disallowIncomingNftTokenOffer}
          currentValue={isFlagEnabled(accountFlags, "lsfDisallowIncomingNFTokenOffer")}
          lastAlteredFlag={lastAlteredFlag}
          handleLastAlteredFlag={handleLastAlteredFlag}
        />
        <FlagCard
          title="lsfDisallowIncomingPayChannel"
          description="To block incoming pay channels"
          mutation={disallowIncomingPayChan}
          currentValue={isFlagEnabled(accountFlags, "lsfDisallowIncomingPayChannel")}
          lastAlteredFlag={lastAlteredFlag}
          handleLastAlteredFlag={handleLastAlteredFlag}
        />
        <FlagCard
          title="lsfDisallowIncomingTrustline"
          description="To block incoming trustline"
          mutation={disallowIncomingTrustline}
          currentValue={isFlagEnabled(accountFlags, "lsfDisallowIncomingTrustline")}
          lastAlteredFlag={lastAlteredFlag}
          handleLastAlteredFlag={handleLastAlteredFlag}
        />
        <FlagCard
          title="lsfDisallowXRP"
          description="Client applications should not send xrp to this account. Not enforced by ripple."
          mutation={disallowXrp}
          currentValue={isFlagEnabled(accountFlags, "lsfDisallowXRP")}
          lastAlteredFlag={lastAlteredFlag}
          handleLastAlteredFlag={handleLastAlteredFlag}
        />
        <FlagCard
          title="lsfGlobalFreeze"
          description="All assets issued by this address are frozen"
          mutation={globalFreeze}
          currentValue={isFlagEnabled(accountFlags, "lsfGlobalFreeze")}
          lastAlteredFlag={lastAlteredFlag}
          handleLastAlteredFlag={handleLastAlteredFlag}
        />
        <FlagCard
          title="lsfNoFreeze"
          description="This address cannot freeze trustlines connected to it. Once enabled, cannot be disabled."
          mutation={noFreeze}
          currentValue={isFlagEnabled(accountFlags, "lsfNoFreeze")}
          lastAlteredFlag={lastAlteredFlag}
          handleLastAlteredFlag={handleLastAlteredFlag}
        />
        <FlagCard
          title="lsfRequireAuth"
          description="This account must individually aprove other users for those users to hold this account's tokens"
          mutation={requireAuth}
          currentValue={isFlagEnabled(accountFlags, "lsfRequireAuth")}
          lastAlteredFlag={lastAlteredFlag}
          handleLastAlteredFlag={handleLastAlteredFlag}
        />
        <FlagCard
          title="lsfRequireDestTag"
          description="Requires incoming payments to specify a destination tag"
          mutation={requireDest}
          currentValue={isFlagEnabled(accountFlags, "lsfRequireDestTag")}
          lastAlteredFlag={lastAlteredFlag}
          handleLastAlteredFlag={handleLastAlteredFlag}
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
    </>
  );
}

export default ListFlags;
