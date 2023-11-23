import EditableElement from "@/components/editable-element";
import ItemLabel from "@/components/item-label";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectAddress, selectNetwork } from "../../redux/wallet.selectors";
import { useState } from "react";
import {
  useModifyDomainMutation,
  useModifyTokenTransferFeeMutation,
} from "@/features/shared/redux/xrp.api";

export interface TokenEditablesProps {
  data: any;
  limit?: string;
  issuer: string;
}

function TokenEditables({ data, limit, issuer }: TokenEditablesProps) {
  const network = useSelector(selectNetwork);
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
            -- --
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
              value={"-- --"}
              inputValue={transferFee}
              handleInputChange={(e: any) => setTransferFee(e.target.value)}
              payload={{ sender_addr: address, transfer_fee: transferFee }}
              mutation={modifyTokenTransferFee}
            />
          ) : (
            <Text fontSize="xs" ml={5}>
              -- --
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
          <Text fontSize="xs" letterSpacing={2} ml={5}>
            {limit}
          </Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Supply" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs" ml={5}>
            {network === "mainnet" ? data?.supply : "-- --"}
          </Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Sequence" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs" ml={5}>
            -- --
          </Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Email" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          <Text fontSize="xs" ml={5}>
            -- --
          </Text>
        </Box>
      </Flex>

      <Box as="hr" borderTop="1px solid #4b4a4a" w="30%" />

      <Flex justify="space-between">
        <Box w="30%">
          <ItemLabel title="Domain" fontWeight="400" mb={0} />
        </Box>
        <Box w="57%">
          {isTokenIssuer ? (
            <EditableElement
              value={"-- --"}
              inputValue={domain}
              handleInputChange={(e: any) => setDomain(e.target.value)}
              payload={{ sender_addr: address, domain }}
              mutation={modifyDomain}
            />
          ) : (
            <Text fontSize="xs" ml={5}>
              -- --
            </Text>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}

export default TokenEditables;
