"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  walletConnectWallet,
  injectedWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai, sepolia, avalancheFuji } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const projectId = "13c144b647587663b14a562c11ebe186";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia, polygonMumbai, avalancheFuji],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: "ChainIn",
  projectId,
  chains,
});

const appInfo = {
  appName: "ChainIn",
  appLogo: "/assets/chainin-logo-no-bg.png",
};

const connectors = connectorsForWallets([...wallets]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function RainbowKitProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        appInfo={appInfo}
        theme={lightTheme({
          accentColor: "#6789BA",
          accentColorForeground: "white",
        })}
        modalSize="compact"
      >
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
