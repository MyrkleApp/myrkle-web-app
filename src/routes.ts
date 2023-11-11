const ROUTES = {
  HOME: "/",
  ABOUT_US: "#",
  CONTACT: "#",
  WALLET: "/wallet",
  WALLET_NFT_GALLERY: "/wallet/nft-gallery",
  WALLET_NFT_DETAIL: "/wallet/nft-detail",
  WALLET_NFT_DETAIL_FUNC: (
    uri: string,
    serial: string,
    taxon: string,
    issuer: string,
    fee: string,
    flag: string,
  ) =>
    `/wallet/nft-detail?uri=${uri}&serial=${serial}&taxon=${taxon}&issuer=${issuer}&fee=${fee}&flag=${flag}`,
  TRANSACTIONS: "/transactions",
  TERMINAL: "/terminal",
  TERMINAL_ASSET_MANAGER: "/terminal/asset-manager",
  TERMINAL_ASSET_MANAGER_ACTION: (action: string, token: string, issuer: string, icon: string) =>
    `/terminal/asset-manager?action=${action}&token=${token}&issuer=${issuer}&icon=${icon}`,
  TERMINAL_NEW_ASSET: "/terminal/asset-manager/new-asset",
  TERMINAL_ADD_ASSET: "/terminal/asset-manager/add-asset",
  TERMINAL_BURN_ASSET: "/terminal/asset-manager/burn-asset",
  TERMINAL_CHECKS: "/terminal/checks",
  TERMINAL_CHECKS_CREATED_CHECKS: "/terminal/checks/created-checks",
  TERMINAL_ESCROWS: "/terminal/escrows",
  TERMINAL_ESCROWS_CREATED_ESCROWS: "/terminal/escrows/created-escrows",
  TERMINAL_FLAGS: "/terminal/flags",
  EXCHANGE: "/exchange",
  SETTINGS: "/settings",
};

export default ROUTES;
