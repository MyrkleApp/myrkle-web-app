export const optionsData = {
  tfSell:
    "When this option is enabled, it exchanges the entire `give` amount, even if it means obtaining more than the `get` amount in exchange, by matching offers with better rates",
  tfImmediateOrCancel:
    "When this option is enabled, the offer never becomes a ledger object: it only tries to match existing offers. If the offer cannot match any offers at the time the transaction is processed, it executes `successfully` without trading any currency.",
  tfFillOrKill:
    "When this option is enabled, the offer is not placed into the ledger, and it is canceled if the full amount is not filled when it initially executes. This is similar to `Immediate or Cancel` except it cannot be partially filled.",
};
