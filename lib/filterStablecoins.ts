// lib/filterStablecoins.ts
const stablecoinSymbols = ['USDT', 'USDC', 'DAI', 'TUSD', 'BUSD', 'FDUSD', 'GUSD'];

export const excludeStablecoins = (coins: any[]) =>
  coins.filter((coin) => !stablecoinSymbols.includes(coin.symbol.toUpperCase()));
