import { MotionBox } from "./motion-elements";

function Skeleton1({ ...props }) {
  const dark = "#46454578";
  const middle = "#3b3b3bc8";
  const light = "#ffffff2d";

  return (
    <MotionBox
      h="100px"
      opacity={0.5}
      borderRadius="30px"
      animate={{
        background: [
          `linear-gradient(90deg, ${dark}, ${middle}, ${light})`,
          `linear-gradient(90deg, ${middle}, ${light}, ${dark})`,
          `linear-gradient(90deg, ${light}, ${dark}, ${middle})`,
        ],
      }}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore no problem in operation, although type error appears.
      transition={{
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      }}
      {...props}
    />
  );
}

export default Skeleton1;
