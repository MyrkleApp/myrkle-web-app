import { MotionBox } from "@/components/motion-elements";
import { Button, Flex, HStack, Image, Input, Text } from "@chakra-ui/react";
import ArrowRight3Icon from "@/icons/arrow-right-3";
import Footer from "@/layout/home-layout/footer";
import spark1 from "@/assets/landing-page/spark1.png";
import spark2 from "@/assets/landing-page/spark2.png";

function SectionJ() {
  return (
    <MotionBox
      h="400px"
      pos="relative"
      overflow="hidden"
      initial={{ opacity: 0, y: 200 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5, ease: "easeOut" } }}
    >
      <Flex justify="space-between" align="center" pos="absolute" w="100%" top="25%">
        <Image src={spark1} alt="" w="calc(50% - 200px)" />
        <MotionBox
          w="330px"
          zIndex={1}
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1, transition: { duration: 1, delay: 0.5 } }}
        >
          <Text fontWeight="bold" fontSize="lg" textAlign="center" mb={10}>
            Subscribe to our newsletter
          </Text>

          <HStack>
            <Input w="calc(100% - 70px)" bg="#fff" borderRadius="0" color="#000" />
            <Button w="70px" borderRadius="0 7px 7px 0" bg="secondary" _hover={{ bg: "primary" }}>
              <ArrowRight3Icon fontSize="xl" />
            </Button>
          </HStack>
        </MotionBox>
        <Image src={spark2} alt="" right="0" w="calc(50% - 200px)" />
      </Flex>

      <Footer />
    </MotionBox>
  );
}

export default SectionJ;
