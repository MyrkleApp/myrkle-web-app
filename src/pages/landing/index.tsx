import { Box } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import SectionA from "./section-a";
import HomeNavbar from "@/layout/home-layout/navbar";
import SectionB from "./section-b";
import SectionC from "./section-c";
import SectionD from "./section-d";
import SectionE from "./section-e";
import SectionF from "./section-f";
import SectionG from "./section-g";
import SectionH from "./section-h";
import SectionI from "./section-i";
import SectionJ from "./section-j";
import { useDebounce } from "react-use";

export type TLandingActiveSection = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J";

function LandingPage() {
  const [activeSection, setActiveSection] = useState(1);
  const [deltaY, setDeltaY] = useState(0);

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
        // scroll down event
        if (activeSection === 10) return;
        setActiveSection((prevState) => prevState + 1);
      } else {
        // scroll up event
        if (activeSection === 1) return;
        setActiveSection((prevState) => prevState - 1);
      }
    },
    50,
    [deltaY],
  );

  return (
    <Box w="100vw" h="100vh" pos="relative" overflow="hidden" bg="darker">
      <HomeNavbar />

      <AnimatePresence>
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
      </AnimatePresence>
    </Box>
  );
}

export default LandingPage;
