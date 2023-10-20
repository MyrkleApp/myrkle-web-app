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
      <FlagCard title="Default ripple" description="Flag description" mutation={defaultRipple} />
      <FlagCard title="Disable master" description="Flag description" mutation={disableMaster} />
      <FlagCard
        title="Disallow incoming check"
        description="Flag description"
        mutation={disallowIncomingCheck}
      />
      <FlagCard
        title="Disallow incoming nft token offer"
        description="Flag description"
        mutation={disallowIncomingNftTokenOffer}
      />
      <FlagCard
        title="Disallow incoming payChan"
        description="Flag description"
        mutation={disallowIncomingPayChan}
      />
      <FlagCard
        title="Disallow incoming trustline"
        description="Flag description"
        mutation={disallowIncomingTrustline}
      />
      <FlagCard title="Disallow xrp" description="Flag description" mutation={disallowXrp} />
      <FlagCard title="Global freeze" description="Flag description" mutation={globalFreeze} />
      <FlagCard title="No freeze" description="Flag description" mutation={noFreeze} />
      <FlagCard title="Require auth" description="Flag description" mutation={requireAuth} />
      <FlagCard title="Require destination" description="Flag description" mutation={requireDest} />
    </SimpleGrid>
  );
}

export default ListFlags;
