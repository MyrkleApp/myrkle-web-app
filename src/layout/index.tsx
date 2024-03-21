import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import LogoIcon from "@/icons/logo";
import FooterLogoIcon from "@/icons/footer-logo";
import { Link } from "react-router-dom";
import ROUTES from "@/routes";
// import { useDispatch, useSelector } from "react-redux";
// import { selectUserId } from "@/features/auth/redux/auth.selectors";
// import MyrkleLoader from "@/components/myrkle-loader";
// import Backdrop from "@/components/backdrop";
// import axios from "axios";
// import { baseUrl } from "@/constants";
// import { setUserId } from "@/features/auth/redux/auth.slice";
// import { useCookie } from "react-use";

export interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  // const navigate = useNavigate();

  // const userId = useSelector(selectUserId);

  // const [userTokenCookie] = useCookie("user-token");

  // const dispatch = useDispatch();

  // const { isOpen: isLoaderOpen, onOpen: onLoaderOpen, onClose: onLoaderClose } = useDisclosure();

  // useEffect(() => {
  //   if (userId !== null) return;

  //   if (userTokenCookie) {
  //     onLoaderOpen();

  //     axios
  //       .get(`${baseUrl}/auth/user/`, { headers: { Authorization: `Token ${userTokenCookie}` } })
  //       .then((res) => {
  //         dispatch(setUserId(res.data.pk));
  //         onLoaderClose();
  //       })
  //       .catch(() => {
  //         onLoaderClose();
  //         navigate(ROUTES.AUTH);
  //       });
  //   } else {
  //     navigate(ROUTES.AUTH);
  //   }
  // }, [dispatch, navigate, onLoaderClose, onLoaderOpen, userId, userTokenCookie]);

  // if (isLoaderOpen) {
  //   return (
  //     <Backdrop isOpen w="100vw" h="100vh" bg="darkest" top={0} borderRadius="0" isFullscreen>
  //       <MyrkleLoader />
  //     </Backdrop>
  //   );
  // }

  return (
    <Box h="100vh" w="100vw" overflow="hidden" maxH="900px" maxW="1800px">
      <Box h="100%" bg="darkest" pos="relative">
        <Box
          h="100%"
          w={["100px", null, null, null, "250px"]}
          pos="absolute"
          top="0"
          left="0"
          pl="20px"
        >
          <Flex h="70px" justify="center" align="center">
            <Link to={ROUTES.LANDING}>
              <LogoIcon fontSize="100px" display={["none", null, null, null, "block"]} />
            </Link>
          </Flex>
          <Box h="calc(100% - 50px - 50px)">
            <Sidebar />
          </Box>
          <Box h="50px">{/* bottom */}</Box>
        </Box>

        <Box
          h="100%"
          w={["calc(100% - 100px - 10px)", null, null, null, "calc(100% - 250px - 10px)"]}
          pos="absolute"
          top="0"
          right="0"
          pr={10}
        >
          <Box h="70px">
            <Navbar />
          </Box>
          <Box h="calc(100% - 50px - 50px)" pos="relative">
            {children}
          </Box>
          <Box h="30px">{/* bottom */}</Box>
        </Box>

        <Box pos="absolute" bottom="5px" left="20px">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdErVhFbxkteOUOAbDdWa1YZvQ-ykYSUxg_t3Kp7IS4XABJBQ/viewform?usp=sf_link"
            target="_blank"
          >
            <Text color="#c0bdbd" fontWeight="bold" fontSize="xs" textDecoration="underline">
              Report an issue
            </Text>
          </a>
        </Box>

        <HStack pos="absolute" bottom="-10px" right="20px">
          <Text color="#4C4C4C" fontWeight="bold" fontSize="sm">
            powered by
          </Text>
          <FooterLogoIcon fontSize="50px" />
        </HStack>
      </Box>
    </Box>
  );
}

export default Layout;
