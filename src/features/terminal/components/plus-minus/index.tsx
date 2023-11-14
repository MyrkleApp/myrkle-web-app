import { HStack } from "@chakra-ui/react";
import Button from "../../../../components/button";
import PlusIcon from "@/icons/plus";
import MinusIcon from "@/icons/minus";
import Input from "../../../../components/input";

export interface PlusMinusProps {
  value: string | number;
  handleMinusClick: () => void;
  handlePlusClick: () => void;
  handleInputChange: (e: any) => void;
  isDisabled?: boolean;
}

function PlusMinus({
  value,
  isDisabled,
  handleMinusClick,
  handlePlusClick,
  handleInputChange,
}: PlusMinusProps) {
  return (
    <HStack bg="secondary" w="170px" p={1} justify="space-between" borderRadius="5px">
      <Button h="35px" w="35px" bg="#585858" borderRadius="5px" onClick={handleMinusClick}>
        <MinusIcon fontSize="sm" />
      </Button>

      <Input
        fontSize="sm"
        fontWeight="bold"
        border="none"
        value={value}
        onChange={handleInputChange}
      />

      <Button
        h="35px"
        w="35px"
        bg="#585858"
        borderRadius="5px"
        isDisabled={isDisabled}
        onClick={handlePlusClick}
      >
        <PlusIcon fontSize="sm" />
      </Button>
    </HStack>
  );
}

export default PlusMinus;
