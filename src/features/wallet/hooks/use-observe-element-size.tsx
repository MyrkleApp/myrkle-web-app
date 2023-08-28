import { useEffect, useState } from "react";

function useObserveElementSize(id: string) {
  const [size, setSize] = useState(100);

  useEffect(() => {
    const element = document.getElementById(id);

    if (!element) return;

    setSize(element.offsetHeight);

    window.addEventListener("resize", () => {
      setSize(element.offsetHeight);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setSize(element.offsetHeight);
      });
    };
  }, [id, size]);

  return size;
}

export default useObserveElementSize;
