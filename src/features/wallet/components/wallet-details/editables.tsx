import EditableElement from "@/components/editable-element";
import ItemLabel from "@/components/item-label";
import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import xrpLogo from "@/assets/xrp-logo.svg";
import { useModifyDomainMutation, useModifyEmailMutation } from "@/features/shared/redux/xrp.api";
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

  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");

  // ========================================================================================
  // api
  // ========================================================================================

  const [modifyEmail, { isLoading: isModifyEmailLoading }] = useModifyEmailMutation();
  const [modifyDomain, { isLoading: isModifyDomainLoading }] = useModifyDomainMutation();

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
          <EditableElement value={data?.token_transfer_fee} />
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
          <EditableElement
            value={data?.email}
            inputValue={email}
            handleInputChange={(e: any) => setEmail(e.target.value)}
            isLoading={isModifyEmailLoading}
            payload={{ sender_addr: address, email }}
            mutation={modifyEmail}
          />
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
            isLoading={isModifyDomainLoading}
            payload={{ sender_addr: address, domain }}
            mutation={modifyDomain}
          />
        </Box>
      </Flex>
    </Flex>
  );
}

export default Editables;
