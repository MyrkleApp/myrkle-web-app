import Input from "@/components/input";
import MinusIcon from "@/icons/minus";
import PlusIcon from "@/icons/plus";
import { Circle, GridItem } from "@chakra-ui/react";

export interface AttributeRowProps {
  traitType: string;
  handleTraitTypeChange: (e: any) => void;
  traitValue: string;
  handleTraitValueChange: (e: any) => void;
  handlePlusIconClick: () => void;
  handleRemoveIconClick: () => void;
  isAddItemDisabled: boolean;
  isRemoveItemDisabled: boolean;
}

function AttributeRow({
  traitType,
  handleTraitTypeChange,
  traitValue,
  handleTraitValueChange,
  handlePlusIconClick,
  handleRemoveIconClick,
  isAddItemDisabled,
  isRemoveItemDisabled,
}: AttributeRowProps) {
  return (
    <>
      <GridItem colSpan={4}>
        <Input value={traitType} onChange={handleTraitTypeChange} />
      </GridItem>
      <GridItem colSpan={6}>
        <Input value={traitValue} onChange={handleTraitValueChange} />
      </GridItem>
      <GridItem colSpan={1}>
        <Circle
          size="40px"
          bg="secondary"
          cursor={isAddItemDisabled ? "not-allowed" : "pointer"}
          onClick={handlePlusIconClick}
        >
          <PlusIcon />
        </Circle>
      </GridItem>
      <GridItem colSpan={1}>
        <Circle
          size="40px"
          bg="secondary"
          cursor={isRemoveItemDisabled ? "not-allowed" : "pointer"}
          onClick={handleRemoveIconClick}
        >
          <MinusIcon />
        </Circle>
      </GridItem>
    </>
  );
}

export default AttributeRow;
