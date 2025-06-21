// app/page.tsx
'use client';

import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { excludeStablecoins } from '@/lib/filterStablecoins';

type Coin = {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
};

export default function Home() {
  const { data, error, isLoading } = useSWR<Coin[]>(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false&price_change_percentage=7d',
    fetcher,
    { refreshInterval: 60000 }
  );

  if (error) return <p className="text-danger">Failed to load data</p>;
  if (isLoading) return <p>Loading...</p>;

  const coins = excludeStablecoins(data ?? []).slice(0, 20);

  return (
    <div className="container py-5">
      <h1 className="mb-4">Top 20 Cryptocurrencies (No Stablecoins)</h1>
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price (USD)</th>
            <th>Change (24h)</th>
            <th>Change (7d)</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id}>
              <td>{coin.name}</td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td className={coin.price_change_percentage_24h > 0 ? 'text-success' : 'text-danger'}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td className={coin.price_change_percentage_7d_in_currency > 0 ? 'text-success' : 'text-danger'}>
                {coin.price_change_percentage_7d_in_currency.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
