import useSubmitTxn from "@/features/shared/hooks/use-submit-txn";
import { selectAddress } from "@/features/wallet/redux/wallet.selectors";
import { Box, HStack, Spacer, Switch, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export interface FlagCardProps {
  title?: string;
  description?: string;
  currentValue?: boolean;
  mutation?: (value: any) => any;
}

function FlagCard({ title, description, currentValue, mutation }: FlagCardProps) {
  const address = useSelector(selectAddress);

  const [switchValue, setSwitchValue] = useState(false);

  const handleSubmitTxn = useSubmitTxn();

  useEffect(() => {
    setSwitchValue(!!currentValue);
  }, [currentValue]);

  const handleToggleSwitch = () => {
    setSwitchValue(!switchValue);

    if (!mutation) return;

    mutation({ sender_addr: address, state: switchValue })
      .unwrap()
      .then((res: any) => {
        console.log(res);
        handleSubmitTxn(res);
      });
  };

  return (
    <Box bg="dark" borderRadius="30px" p="30px" w="100%" h="100%" aspectRatio={1 / 0.8}>
      <HStack mb="40px">
        <Text fontWeight="bold" fontSize="sm">
          {title || "Flags name"}
        </Text>
        <Spacer />
        <Switch colorScheme="whatsapp" isChecked={switchValue} onChange={handleToggleSwitch} />
      </HStack>

      <Text fontSize="sm">
        {description || "This account is an automated market maker instance."}
      </Text>
    </Box>
  );
}

export default FlagCard;
