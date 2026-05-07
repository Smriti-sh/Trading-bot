export const SUPPORTED_ASSETS = ["SOL", "BTC", "ETH"] as const;

export type SupportedAsset = (typeof SUPPORTED_ASSETS)[number];

export type TradingMetadata = {
  type: "LONG" | "SHORT",
  qty: number,
  symbol: SupportedAsset
}
 
// asset => SOL
// price => 150
export type PriceTriggerMetadata = {
  asset: string,
  price: number,
};

// Defines what data this node holds
export type TimerNodeMetadata = {
  time: number;
};