import Input from "@/components/input";
import PlusIcon from "@/icons/plus";
import { Circle, GridItem } from "@chakra-ui/react";

export interface AttributeRowProps {
  traitType: string;
  handleTraitTypeChange: (e: any) => void;
  traitValue: string;
  handleTraitValueChange: (e: any) => void;
  handlePlusIconClick: () => void;
}

function AttributeRow({
  traitType,
  handleTraitTypeChange,
  traitValue,
  handleTraitValueChange,
  handlePlusIconClick,
}: AttributeRowProps) {
  return (
    <>
      <GridItem colSpan={4}>
        <Input value={traitType} onChange={handleTraitTypeChange} />
      </GridItem>
      <GridItem colSpan={6}>
        <Input value={traitValue} onChange={handleTraitValueChange} />
      </GridItem>
      <GridItem colSpan={2}>
        <Circle size="40px" bg="secondary" cursor="pointer" onClick={handlePlusIconClick}>
          <PlusIcon />
        </Circle>
      </GridItem>
    </>
  );
}

export default AttributeRow;
