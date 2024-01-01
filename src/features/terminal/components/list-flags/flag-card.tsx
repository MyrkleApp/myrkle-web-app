import { Box, HStack, Spacer, Switch, Text } from "@chakra-ui/react";

export interface FlagCardProps {
  title: string;
  description?: string;
  isDisabled?: boolean;
  isChecked: boolean;
  handleSwitchClick?: () => void;
}

function FlagCard({ title, description, isDisabled, isChecked, handleSwitchClick }: FlagCardProps) {
  return (
    <>
      <Box bg="dark" borderRadius="30px" p="30px" w="100%" h="100%" aspectRatio={1 / 0.8}>
        <HStack mb="40px">
          <Text fontWeight="bold" fontSize="sm" maxW="80%" textOverflow="break-work">
            {title || "Flags name"}
          </Text>
          <Spacer />
          <Switch
            colorScheme="whatsapp"
            isChecked={isChecked}
            onChange={handleSwitchClick}
            isDisabled={!!isDisabled}
          />
        </HStack>
        <Text fontSize="sm">{description}</Text>
      </Box>
    </>
  );
}

export default FlagCard;
