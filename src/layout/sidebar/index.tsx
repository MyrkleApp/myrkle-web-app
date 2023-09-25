import WalletIcon from "@/icons/wallet";
import TransactionIcon from "@/icons/transaction";
import TerminalIcon from "@/icons/terminal";
import ExchangeIcon from "@/icons/exchange";
import SettingsIcon from "@/icons/settings";
import { Box, Flex } from "@chakra-ui/react";
import NavItem from "./nav-item";
import { useLocation } from "react-router-dom";
import ROUTES from "@/routes";

const navItems = [
  { title: "Wallet", icon: WalletIcon, link: ROUTES.WALLET },
  { title: "Transaction", icon: TransactionIcon, link: ROUTES.TRANSACTIONS },
  { title: "Terminal", icon: TerminalIcon, link: ROUTES.TERMINAL },
  { title: "Exchange", icon: ExchangeIcon, link: ROUTES.EXCHANGE },
  // { title: "Settings", icon: SettingsIcon, link: ROUTES.SETTINGS },
];

function Sidebar() {
  const { pathname } = useLocation();

  return (
    <Flex
      direction="column"
      justify="space-between"
      w="100%"
      h="100%"
      bg="dark"
      p="20px"
      borderRadius="25px"
    >
      <Box>
        {navItems.map(({ title, icon, link }, i) => (
          <NavItem
            key={i}
            title={title}
            icon={icon}
            link={link}
            isActive={pathname.includes(link)}
          />
        ))}
      </Box>
      <Box>
        <NavItem
          title="Settings"
          icon={SettingsIcon}
          link={ROUTES.SETTINGS}
          isActive={pathname.includes(ROUTES.SETTINGS)}
        />
      </Box>
    </Flex>
  );
}

export default Sidebar;
