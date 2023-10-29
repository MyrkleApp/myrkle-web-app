import { SimpleGrid } from "@chakra-ui/react";
import FlagCard from "./flag-card";
import {
  useAccountTxnIdMutation,
  useDefaultRippleMutation,
  useDisableMasterMutation,
  useDisallowIncomingCheckMutation,
  useDisallowIncomingNftTokenOfferMutation,
  useDisallowIncomingPayChanMutation,
  useDisallowIncomingTrustlineMutation,
  useDisallowXrpMutation,
  useGlobalFreezeMutation,
  useNoFreezeMutation,
  useRequireAuthMutation,
  useRequireDestMutation,
} from "@/features/shared/redux/xrp.api";

function ListFlags() {
  const [accountTxnId] = useAccountTxnIdMutation();
  //
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

  return (
    <SimpleGrid w="85%" h="100%" columns={[1, null, 2, 3]} spacing="50px">
      <FlagCard
        title="Account transaction id"
        description="Flag description"
        mutation={accountTxnId}
      />
      <FlagCard title="Auth nft token minter" description="Flag description" />
      <FlagCard
        title="lsfDefaultRipple"
        description="enable rippling on this address's trust lines by default. Required for issuing addresses; discouraged for others"
        mutation={defaultRipple}
      />
      <FlagCard
        title="lsfDisableMaster"
        description="Disallows use of the master key to sign transactions for this account"
        mutation={disableMaster}
      />
      <FlagCard
        title="lsfDisallowIncomingCheck"
        description="To block incoming check"
        mutation={disallowIncomingCheck}
      />
      <FlagCard
        title="lsfDisallowIncomingNFTokenOffer"
        description="To block incoming nftoken offers"
        mutation={disallowIncomingNftTokenOffer}
      />
      <FlagCard
        title="lsfDisallowIncomingPayChannel"
        description="To block incoming pay channels"
        mutation={disallowIncomingPayChan}
      />
      <FlagCard
        title="lsfDisallowIncomingTrustline"
        description="To block incoming trustline"
        mutation={disallowIncomingTrustline}
      />
      <FlagCard
        title="lsfDisallowXRP"
        description="Client applications should not send xrp to this account. Not enforced by ripple."
        mutation={disallowXrp}
      />
      <FlagCard
        title="lsfGlobalFreeze"
        description="All assets issued by this address are frozen"
        mutation={globalFreeze}
      />
      <FlagCard
        title="lsfNoFreeze"
        description="This address cannot freeze trustlines connected to it. Once enabled, cannot be disabled."
        mutation={noFreeze}
      />
      <FlagCard
        title="lsfRequireAuth"
        description="This account must individually aprove other users for those users to hold this account's tokens"
        mutation={requireAuth}
      />
      <FlagCard
        title="lsfRequireDestTag"
        description="Requires incoming payments to specify a destination tag"
        mutation={requireDest}
      />
    </SimpleGrid>
  );
}

export default ListFlags;
