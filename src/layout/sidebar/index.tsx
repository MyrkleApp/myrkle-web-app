import WalletIcon from "@/icons/wallet";
import TransactionIcon from "@/icons/transaction";
import TerminalIcon from "@/icons/terminal";
import ExchangeIcon from "@/icons/exchange";
import SettingsIcon from "@/icons/settings";
import { Box } from "@chakra-ui/react";
import NavItem from "./nav-item";
import { useLocation } from "react-router-dom";

const navItems = [
  { title: "Wallet", icon: WalletIcon, link: "/wallet" },
  { title: "Transaction", icon: TransactionIcon, link: "/transactions" },
  { title: "Terminal", icon: TerminalIcon, link: "/terminal" },
  { title: "Exchange", icon: ExchangeIcon, link: "/exchange" },
  { title: "Settings", icon: SettingsIcon, link: "/settings" },
];

function Sidebar() {
  const { pathname } = useLocation();

  return (
    <Box w="100%" h="100%" bg="dark" p="30px 10px 20px 15px" borderRadius="25px">
      {navItems.map(({ title, icon, link }, i) => (
        <NavItem key={i} title={title} icon={icon} link={link} isActive={pathname.includes(link)} />
      ))}
    </Box>
  );
}

export default Sidebar;
