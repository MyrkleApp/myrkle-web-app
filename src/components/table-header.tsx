import React from "react";
import { Th } from "@chakra-ui/react";

export interface TableHeaderProps {
  children: React.ReactNode;
  [anyProp: string]: any;
}

function TableHeader({ children, ...props }: TableHeaderProps) {
  return (
    <Th textAlign="center" borderRight="1px solid #3D3D3D" color="#fff" {...props}>
      {children}
    </Th>
  );
}

export default TableHeader;
