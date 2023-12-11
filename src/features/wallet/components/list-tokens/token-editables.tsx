import EditableElement from "@/components/editable-element";
import ItemLabel from "@/components/item-label";
import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectAddress } from "../../redux/wallet.selectors";
import { useState } from "react";
import {
  useModifyDomainMutation,
  useModifyTokenTransferFeeMutation,
} from "@/features/shared/redux/xrp.api";
import { formatNumber } from "@/helpers";

export interface TokenEditablesProps {
  data: any;
  limit?: string;
  issuer: string;
  accountTokenInfo: any;
  icon: string;
}

function TokenEditables({ data, limit, issuer, accountTokenInfo, icon }: TokenEditablesProps) {
  const address = useSelector(selectAddress);

  const isTokenIssuer = issuer === address;

  const [domain, setDomain] = useState("");
  const [transferFee, setTransferFee] = useState("");

  const [modifyDomain] = useModifyDomainMutation();
  const [modifyTokenTransferFee] = useModifyTokenTransferFeeMutation();

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
        <Box w="30%">
          <ItemLabel title="Market cap" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs" ml={5}>
            $ {formatNumber(data?.marketCap)}
          </Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Transfer fee" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          {isTokenIssuer ? (
            <EditableElement
              value={accountTokenInfo?.transfer_fee || "-- --"}
              inputValue={transferFee}
              handleInputChange={(e: any) => setTransferFee(e.target.value)}
              payload={{ sender_addr: address, transfer_fee: transferFee }}
              mutation={modifyTokenTransferFee}
            />
          ) : (
            <Text fontSize="xs" ml={5}>
              {formatNumber(accountTokenInfo?.transfer_fee, 1)}%
            </Text>
          )}
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Limit" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <HStack ml={5}>
            <Image src={icon} alt="xrp" h="22px" />
            <Text fontSize="xs" letterSpacing={2}>
              {formatNumber(limit || "")}
            </Text>
          </HStack>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Supply" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <HStack ml={5}>
            <Image src={icon} alt="xrp" h="22px" />
            <Text fontSize="xs" letterSpacing={2}>
              {formatNumber(data?.supply)}
            </Text>
          </HStack>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Trustlines" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs" ml={5}>
            {formatNumber(data?.trustlines)}
          </Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      {/* <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Email" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs" ml={5}>
            {accountTokenInfo?.email || "-- --"}
          </Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" /> */}

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Domain" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          {isTokenIssuer ? (
            <EditableElement
              value={data?.domain || "-- --"}
              inputValue={domain}
              handleInputChange={(e: any) => setDomain(e.target.value)}
              payload={{ sender_addr: address, domain }}
              mutation={modifyDomain}
            />
          ) : (
            <Text fontSize="xs" ml={5}>
              {data?.domain || "-- --"}
            </Text>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}

export default TokenEditables;
