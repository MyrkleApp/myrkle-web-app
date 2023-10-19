import { MotionBox } from "@/components/motion-elements";
import { Box, HStack, Spacer, Text } from "@chakra-ui/react";

export interface ManagerCardProps {
  title: string;
  subtitle: string;
}

function ManagerCard({ title, subtitle }: ManagerCardProps) {
  return (
    <MotionBox bg="dark" h="120px" borderRadius="20px" p="20px" mb={4}>
      <HStack mb={3}>
        <Text fontSize="sm" fontWeight="bold">
          {title}
        </Text>
        <Spacer />
        <Box />
      </HStack>

      <Box bg="#575656" borderRadius="40px" p="9px 20px">
        <Text fontSize="sm">{subtitle}</Text>
      </Box>
    </MotionBox>
  );
}

export default ManagerCard;
