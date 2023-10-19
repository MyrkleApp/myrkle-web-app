import { HStack } from "@chakra-ui/react";
import Button from "../../../../components/button";
import PlusIcon from "@/icons/plus";
import MinusIcon from "@/icons/minus";
import Input from "../../../../components/input";

export interface PlusMinusProps {
  value: number;
  handleMinusClick: () => void;
  handlePlusClick: () => void;
  handleInputChange: (e: any) => void;
  minValue?: number;
  maxValue: number;
}

function PlusMinus({
  value,
  minValue = 0,
  maxValue,
  handleMinusClick,
  handlePlusClick,
  handleInputChange,
}: PlusMinusProps) {
  return (
    <HStack bg="secondary" w="170px" p={1} justify="space-between" borderRadius="5px">
      <Button
        h="35px"
        w="35px"
        bg="#585858"
        borderRadius="5px"
        isDisabled={value <= minValue}
        onClick={handleMinusClick}
      >
        <MinusIcon fontSize="sm" />
      </Button>

      <Input
        fontSize="sm"
        fontWeight="bold"
        border="none"
        value={value}
        onChange={handleInputChange}
        minValue={minValue}
        max={maxValue}
      />

      <Button
        h="35px"
        w="35px"
        bg="#585858"
        borderRadius="5px"
        isDisabled={value >= maxValue}
        onClick={handlePlusClick}
      >
        <PlusIcon fontSize="sm" />
      </Button>
    </HStack>
  );
}

export default PlusMinus;
