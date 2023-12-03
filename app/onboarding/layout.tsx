import "../globals.css";
import { RainbowKitProviders } from "@/components/provider/rainbowkit-provider";
import "@rainbow-me/rainbowkit/styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RainbowKitProviders>{children}</RainbowKitProviders>
      </body>
    </html>
  );
}
