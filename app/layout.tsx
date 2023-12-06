import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RainbowKitProviders } from "@/components/provider/rainbowkit-provider";
import "@rainbow-me/rainbowkit/styles.css";
import '@radix-ui/themes/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChainIn",
  description: "A Business & Employment-Focused dApp",
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
