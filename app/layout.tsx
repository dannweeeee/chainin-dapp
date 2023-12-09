import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RainbowKitProviders } from "@/components/provider/rainbowkit-provider";
import "@rainbow-me/rainbowkit/styles.css";
import "@radix-ui/themes/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://chainin.netlify.app"),
  title: "ChainIn",
  description:
    "Authenticity-Driven, Privacy-Focused Business & Employment Aggregator dApp",
  keywords: [
    "Authenticity-Driven",
    "Privacy-Focused",
    "Blockchain",
    "dApp",
    "Chainlink",
    "Tableland",
    "The Graph",
    "Polygon ID",
  ],
  openGraph: {
    images:
      "https://github.com/usechainin/.github/blob/main/assets/chainin-logo.png?raw=true",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RainbowKitProviders>{children}</RainbowKitProviders>
      </body>
    </html>
  );
}
