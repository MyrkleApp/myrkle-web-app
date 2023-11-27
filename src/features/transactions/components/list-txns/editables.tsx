import ItemLabel from "@/components/item-label";
import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import RenderElement from "@/components/render-element";
import { ellipsisAtCenter, formatDate, formatTime } from "@/helpers";

export interface ListTxnsEditables {
  txn: any;
  txnInfo: any;
  isTxnInfoLoading: boolean;
}

function ListTxnsEditables({ txn, txnInfo, isTxnInfoLoading }: ListTxnsEditables) {
  return (
    <Flex
      direction="column"
      justify="space-between"
      w="calc(100% - 40px)"
      h="calc(100% - 40px)"
      mt="20px"
      mx="auto"
    >
      <Flex justify="space-between">
        <Box w="35%">
          <ItemLabel title="Sequence" fontWeight="400" mb={0} />
        </Box>
        <Box w="50%">
          <RenderElement isLoading={isTxnInfoLoading} w="100%">
            <Text fontSize="xs">{txnInfo?.sequence}</Text>
          </RenderElement>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="35%" />

      <Flex justify="space-between">
        <Box w="35%">
          <ItemLabel title="Date" fontWeight="400" mb={0} />
        </Box>
        <Box w="50%">
          <Text fontSize="xs">{formatDate(txn?.timestamp)}</Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="35%" />

      <Flex justify="space-between">
        <Box w="35%">
          <ItemLabel title="Time" fontWeight="400" mb={0} />
        </Box>
        <Box w="50%">
          <Text fontSize="xs">{formatTime(txn?.timestamp)}</Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="35%" />

      <Flex justify="space-between">
        <Box w="35%">
          <ItemLabel title="Fee" fontWeight="400" mb={0} />
        </Box>
        <Box w="50%">
          <HStack>
            <Image src={xrpLogo} alt="logo" h="18px" />
            <Text fontSize="xs">{txn?.fee}</Text>
          </HStack>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="35%" />

      <Flex justify="space-between">
        <Box w="35%">
          <ItemLabel title="Signature" fontWeight="400" mb={0} />
        </Box>
        <Box w="50%">
          <RenderElement isLoading={isTxnInfoLoading} w="100%">
            <Text fontSize="xs">{ellipsisAtCenter(txnInfo?.signature || "")}</Text>
          </RenderElement>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="35%" />

      <Flex justify="space-between">
        <Box w="35%">
          <ItemLabel title="Transaction Type" fontWeight="400" mb={0} />
        </Box>
        <Box w="50%">
          <Text fontSize="xs">{txn?.tx_type}</Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="35%" />

      <Flex justify="space-between">
        <Box w="35%">
          <ItemLabel title="Result" fontWeight="400" mb={0} />
        </Box>
        <Box w="50%">
          <Text fontSize="xs">{txn?.result}</Text>
        </Box>
      </Flex>
    </Flex>
  );
}

export default ListTxnsEditables;
