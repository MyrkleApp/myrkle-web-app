import { Box, HStack, Spacer, Switch, Text } from "@chakra-ui/react";

export interface FlagCardProps {
  title?: string;
  description?: string;
}

function FlagCard({ title, description }: FlagCardProps) {
  return (
    <Box bg="dark" borderRadius="30px" p="30px" w="100%" h="100%" aspectRatio={1 / 0.8}>
      <HStack mb="40px">
        <Text fontWeight="bold" fontSize="sm">
          {title || "Flags name"}
        </Text>
        <Spacer />
        <Switch colorScheme="whatsapp" />
      </HStack>

      <Text fontSize="sm">
        {description || "This account is an automated market maker instance."}
      </Text>
    </Box>
  );
}

export default FlagCard;
