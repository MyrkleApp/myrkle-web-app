import { Box } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import SectionA from "./section-a";
import HomeNavbar from "@/layout/home-layout/navbar";
import SectionB from "./section-b";
// import SectionC from "./section-c";
// import SectionD from "./section-d";
// import SectionE from "./section-e";
// import SectionF from "./section-f";
// import SectionG from "./section-g";
// import SectionH from "./section-h";
import SectionI from "./section-i";
import SectionJ from "./section-j";
import { useDebounce } from "react-use";
import { useSearchParams } from "react-router-dom";
import BubbleSection from "./bubble-section";

function LandingPage() {
  const [searchParams] = useSearchParams();
  const section = searchParams.get("section");

  const [activeSection, setActiveSection] = useState(1);
  const [deltaY, setDeltaY] = useState(0);

  const scrollDown = useCallback(() => {
    if (activeSection === 10) return;
    setActiveSection((prevState) => prevState + 1);
    setDeltaY(0);
  }, [activeSection]);

  const scrollUp = useCallback(() => {
    if (activeSection > 1) {
      setActiveSection((prevState) => prevState - 1);
      setDeltaY(0);
    }
  }, [activeSection]);

  useEffect(() => {
    if (section === "home") {
      setActiveSection(1);
    } else if (section === "about") {
      setActiveSection(9);
    }
  }, [section]);

  useEffect(() => {
    window.addEventListener("wheel", (event) => {
      const deltaY = event.deltaY;

      if (deltaY !== 0) {
        setDeltaY(event.deltaY);
      }
    });

    return () =>
      window.removeEventListener("wheel", () => {
        /**/
      });
  }, []);

  useDebounce(
    () => {
      if (deltaY > 0) {
        scrollDown();
      } else if (deltaY < 0) {
        scrollUp();
      }
      setDeltaY(0);
    },
    50,
    [deltaY],
  );

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "ArrowUp") {
        scrollUp();
      } else if (event.key === "ArrowDown") {
        scrollDown();
      }
    };

    const handleWindowKeyDown = (event: any) => {
      handleKeyDown(event);
    };

    window.addEventListener("keydown", handleWindowKeyDown);

    return () => {
      window.removeEventListener("keydown", handleWindowKeyDown);
    };
  }, [scrollDown, scrollUp]);

  return (
    <Box w="100vw" h="100vh" pos="relative" bg="darker" overflow="hidden scroll">
      <HomeNavbar />

      <SectionA />

      <Box h="100px" />

      <SectionB />
      <BubbleSection />
      {/* <SectionC />
      <SectionD />
      <SectionE /> */}
      {/* <SectionF />
      <SectionG />
      <SectionH /> */}
      <SectionI />
      <SectionJ />

      {/* <AnimatePresence>
        {activeSection === 1 && <SectionA />}
        {activeSection === 2 && <SectionB />}
        {activeSection === 3 && <SectionC />}
        {activeSection === 4 && <SectionD />}
        {activeSection === 5 && <SectionE />}
        {activeSection === 6 && <SectionF />}
        {activeSection === 7 && <SectionG />}
        {activeSection === 8 && <SectionH />}
        {activeSection === 9 && <SectionI />}
        {activeSection === 10 && <SectionJ />}
      </AnimatePresence> */}
    </Box>
  );
}

export default LandingPage;
