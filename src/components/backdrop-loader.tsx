import { createPortal } from "react-dom";
import Backdrop from "./backdrop";
import React from "react";
import MyrkleLoader from "./myrkle-loader";

export interface BackdropLoader {
  isOpen: boolean;
  children?: React.ReactNode;
  isLoading?: boolean;
}

function BackdropLoader({ isOpen, isLoading, children }: BackdropLoader) {
  return (
    <>
      {createPortal(
        <Backdrop isOpen={isOpen}>{isLoading ? <MyrkleLoader /> : <>{children}</>}</Backdrop>,
        document.body,
      )}
    </>
  );
}

export default BackdropLoader;
