import { MotionBox } from "@/components/motion-elements";
import { Text, useDisclosure, useOutsideClick } from "@chakra-ui/react";
import { useRef } from "react";

export interface ResponseModalProps {
  isError: boolean;
  handleClose: () => void;
}

function ResponseModal({ isError, handleClose }: ResponseModalProps) {
  const ref = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useOutsideClick({
    ref,
    handler: handleClose,
  });

  return (
    <MotionBox
      ref={ref}
      pos="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      h="180px"
      w="250px"
      px={8}
      py={6}
      bg="darker"
      borderRadius="30px"
      overflow="hidden"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        height: isOpen ? 370 : 180,
        width: isOpen ? 470 : 250,
        transition: { duration: 0.5 },
      }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Text
        className="font-face-proxima-nova-extrabld"
        fontSize="lg"
        mb={4}
        color={isError ? "danger" : "success"}
      >
        {isError ? "Error!" : "Success!"}
      </Text>
      <Text fontSize="sm" fontWeight="bold" mb={4}>
        {isError
          ? "Get detailed information of the transaction from your wallet provider"
          : "Your transaction was successful"}
      </Text>
      {isOpen ? (
        <Text fontSize="xs" onClick={onClose}>
          Lorem ipsum dolor sit amet consectetur. Diam etiam malesuada eleifend mi aliquam eleifend
          luctus. Orci nibh tristique ultrices ipsum at. Quis sed tellus vitae quisque diam mauris
          facilisi ullamcorper. Scelerisque platea turpis vel magna. Tellus eget quam ac bibendum
          turpis. Tempus blandit amet arcu justo. Accumsan diam magna euismod pellentesque vulputate
          in morbi. Eget facilisi tellus aliquam vel integer vel. Felis porttitor id lacus magnis in
          ut viverra. Ut eu sit dui amet. Dui amet dictum potenti dignissim nec pharetra nec
          lobortis. Sed nibh ornare gravida vulputate erat posuere neque. Donec velit donec faucibus
          sed vestibulum eu. Urna nisl nulla blandit placerat arcu bibendum. Aliquam donec sit
          commodo enim. Elementum morbi mollis augue sit est nunc volutpat nunc sodales. Sed in
          nulla condimentum a in eu vitae. Quam et aliquet dui commodo magna. Etiam aliquet tellus
          tortor in.
        </Text>
      ) : (
        <Text
          fontSize="xs"
          cursor="pointer"
          w="fit-content"
          color={isError ? "danger" : "success"}
          onClick={onOpen}
          display="none"
        >
          learn more
        </Text>
      )}
    </MotionBox>
  );
}

export default ResponseModal;
