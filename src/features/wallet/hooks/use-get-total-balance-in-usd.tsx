// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { selectAddress, selectNet, selectNetwork } from "../redux/wallet.selectors";
// import { useGetAccountTokensQuery } from "@/features/shared/redux/xrp.api";

// function useGetTotalBalanceInUsd() {
//   const [totalBalance, setTotalBalance] = useState(0);

//   const address = useSelector(selectAddress);
//   const net = useSelector(selectNet);
//   const network = useSelector(selectNetwork);

//   const { isLoading: isAccountTokensLoading, data: accountTokensData } = useGetAccountTokensQuery({
//     address,
//     net,
//   });

//   return totalBalance;
// }

// export default useGetTotalBalanceInUsd;
