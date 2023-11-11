import { MotionBox } from "@/components/motion-elements";
import Skeleton1 from "@/components/skeleton";
import { useLazyParsePayTxnFlagQuery } from "@/features/shared/redux/xrp.api";
import { HStack, Text } from "@chakra-ui/react";
import { Fragment, useEffect } from "react";

export interface ListFlagsProps {
  txnInfo: any;
}

function ListFlags({ txnInfo }: ListFlagsProps) {
  const [parseTxnFlag, { data, isLoading }] = useLazyParsePayTxnFlagQuery();

  useEffect(() => {
    if (txnInfo) {
      parseTxnFlag(txnInfo?.flags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txnInfo?.flags]);

  if (isLoading) {
    return <Skeleton1 w="100%" h="310px" borderRadius="0" mt="58px" />;
  }

  if (!data?.length) {
    return (
      <Text fontSize="sm" mt="58px">
        No flags available for this transaction.
      </Text>
    );
  }

  return (
    <MotionBox
      mt="58px"
      // border="1px solid black"
      h="310px"
      overflow="auto"
      pr={1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {data?.map((flag: any, i: number) => (
        <Fragment key={i}>
          <HStack mb={2}>
            <Text color="textDark" fontWeight="bold" fontSize="xs">
              {flag?.flagname}
            </Text>
          </HStack>
          <Text
            color="textDark"
            fontSize="xs"
            pb={2}
            mb={3}
            borderBottom="1px solid #525151"
            lineHeight={1.4}
          >
            {flag?.description}
          </Text>
        </Fragment>
      ))}
    </MotionBox>
  );
}

export default ListFlags;
