// app/layout.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

export const metadata = {
  title: 'Top 20 Cryptos',
  description: 'Top 20 Market Cap Cryptocurrencies (Excluding Stablecoins)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body className="bg-dark text-light">{children}</body>
    </html>
  );
}
