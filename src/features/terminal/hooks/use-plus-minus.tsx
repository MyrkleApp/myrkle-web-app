import { numbersOnlyRegex } from "@/constants";
import { useState } from "react";

function usePlusMinus({ min, max }: { min: number; max: number }) {
  const [value, setValue] = useState<number>(0);

  const handlePlusClick = () => {
    if (value >= max) return;
    setValue((prevValue) => prevValue + 0.01);
  };

  const handleMinusClick = () => {
    if (value <= min) return;
    setValue((prevValue) => prevValue - 0.01);
  };

  const handleInputChange = (e: any) => {
    e.target.value.match(numbersOnlyRegex) && setValue(Number(e.target.value));
  };

  return [
    value,
    {
      handlePlusClick,
      handleMinusClick,
      handleInputChange,
    },
  ] as const;
}

export default usePlusMinus;
