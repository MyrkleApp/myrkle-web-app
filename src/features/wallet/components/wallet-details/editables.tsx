import EditableElement from "@/components/editable-element";
import ItemLabel from "@/components/item-label";
import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import {
  useModifyDomainMutation,
  useModifyTokenTransferFeeMutation,
} from "@/features/shared/redux/xrp.api";
import { useSelector } from "react-redux";
import { selectAddress } from "../../redux/wallet.selectors";
import { useState } from "react";
import { formatNumber } from "@/helpers";

export interface EditablesProps {
  data: any;
}

function Editables({ data }: EditablesProps) {
  // ========================================================================================
  // selectors
  // ========================================================================================

  const address = useSelector(selectAddress);

  // ========================================================================================
  // state
  // ========================================================================================

  const [domain, setDomain] = useState("");
  const [transferFee, setTransferFee] = useState("");

  // ========================================================================================
  // api
  // ========================================================================================

  const [modifyDomain] = useModifyDomainMutation();
  const [modifyTokenTransferFee] = useModifyTokenTransferFeeMutation();

  // ========================================================================================
  // handlers
  // ========================================================================================

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
        <Box w="30%" borderBottom="1px solid #4b4a4a">
          <ItemLabel title="Transfer fee" fontWeight="400" mb={0} />
        </Box>
        <Box w="60%">
          <EditableElement
            value={data?.token_transfer_fee}
            inputValue={transferFee}
            handleInputChange={(e: any) => setTransferFee(e.target.value)}
            payload={{ sender_addr: address, transfer_fee: transferFee }}
            mutation={modifyTokenTransferFee}
          />
        </Box>
      </Flex>

      <Flex justify="space-between">
        <Box w="30%" borderBottom="1px solid #4b4a4a">
          <ItemLabel title="Total balance" fontWeight="400" />
        </Box>
        <Box w="60%">
          <HStack>
            <Image src={xrpLogo} alt="logo" h="20px" />
            <Text fontSize="sm">{formatNumber(data?.balance)}</Text>
          </HStack>
        </Box>
      </Flex>

      <Flex justify="space-between">
        <Box w="30%" borderBottom="1px solid #4b4a4a">
          <ItemLabel title="Object Type" fontWeight="400" />
        </Box>
        <Box w="60%">
          <HStack>
            <Image src={xrpLogo} alt="logo" h="20px" />
            <Text fontSize="sm">{data?.object_type}</Text>
          </HStack>
        </Box>
      </Flex>

      <Flex justify="space-between">
        <Box w="30%" borderBottom="1px solid #4b4a4a">
          <ItemLabel title="Sequence" fontWeight="400" mb={0} />
        </Box>
        <Box w="60%">
          <Text fontSize="sm">{data?.sequence}</Text>
        </Box>
      </Flex>

      <Flex justify="space-between">
        <Box w="30%" borderBottom="1px solid #4b4a4a">
          <ItemLabel title="Email" fontWeight="400" mb={0} />
        </Box>
        <Box w="60%">
          <Text fontSize="sm">{data?.email || "-- --"}</Text>
        </Box>
      </Flex>

      <Flex justify="space-between">
        <Box w="30%" borderBottom="1px solid #4b4a4a">
          <ItemLabel title="Domain" fontWeight="400" mb={0} />
        </Box>
        <Box w="60%">
          <EditableElement
            value={data?.domain}
            inputValue={domain}
            handleInputChange={(e: any) => setDomain(e.target.value)}
            payload={{ sender_addr: address, domain }}
            mutation={modifyDomain}
          />
        </Box>
      </Flex>
    </Flex>
  );
}

export default Editables;
