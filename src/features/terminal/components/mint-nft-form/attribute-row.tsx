import Input from "@/components/input";
import PlusIcon from "@/icons/plus";
import { Circle, GridItem } from "@chakra-ui/react";

function AttributeRow() {
  return (
    <>
      <GridItem colSpan={4}>
        <Input />
      </GridItem>
      <GridItem colSpan={6}>
        <Input />
      </GridItem>
      <GridItem colSpan={2}>
        <Circle size="40px" bg="secondary" cursor="pointer">
          <PlusIcon />
        </Circle>
      </GridItem>
    </>
  );
}

export default AttributeRow;
