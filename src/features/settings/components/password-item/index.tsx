import EyeIcon from "@/icons/eye";
import { Flex, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { useState } from "react";

export interface PasswordItemProps {
  name: string;
  value: string;
  handleChange: (e: any) => void;
}

function PasswordItem({ name, value, handleChange }: PasswordItemProps) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prevValue) => !prevValue);

  return (
    <Flex
      justify="space-between"
      align="center"
      bg="darker"
      h="50px"
      p={2}
      mb={2}
      borderRadius="30px"
    >
      <Text fontSize="sm" ml={5}>
        {name}
      </Text>
      <InputGroup w="70%">
        <Input
          bg="dark"
          p={2}
          borderRadius="30px"
          border="none"
          focusBorderColor="gray"
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={handleChange}
        />
        <InputRightElement>
          <EyeIcon cursor="pointer" onClick={toggleShowPassword} opacity={showPassword ? 0.2 : 1} />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
}

export default PasswordItem;
