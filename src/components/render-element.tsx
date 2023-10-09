import React from "react";
import Skeleton1 from "./skeleton";

export interface RenderElementProps {
  isLoading: boolean;
  children: React.ReactNode;
  [anyProp: string]: any;
}

function RenderElement({ isLoading, children, ...props }: RenderElementProps) {
  if (isLoading) {
    return <Skeleton1 borderRadius="0" h="30px" w="400px" {...props} />;
  }

  return <>{children}</>;
}

export default RenderElement;
