import { MotionBox } from "./motion-elements";

function WhiteRing({ ...props }: any) {
  return (
    <MotionBox
      borderRadius="50%"
      border="3px solid #ffffff"
      pos="absolute"
      h="28px"
      w="28px"
      // top="calc(50% - 100px)"
      // left="50%"
      // transform={`translate(calc(-50% - ${leftOffset}px), calc(-50% - ${topOffset}px))`}
      // animate={{
      //   top: "calc(50% - 100px)",
      //   left: "50%",
      //   transform: `translate(calc(-50% - ${leftOffset}px), calc(-50% - ${topOffset}px))`,
      //   transition: { duration: 0.8 },
      // }}
      viewport={{ once: true }}
      {...props}
    />
  );
}

export default WhiteRing;
