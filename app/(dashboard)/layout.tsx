import Topbar from "@/components/main/Topbar";
import "../globals.css";
import LeftSidebar from "@/components/main/LeftSidebar";
import RightSidebar from "@/components/main/RightSidebar";
import Bottombar from "@/components/main/Bottombar";
import { RainbowKitProviders } from "@/components/provider/rainbowkit-provider";
import "@rainbow-me/rainbowkit/styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <RainbowKitProviders>
        <Topbar />
        <main className="flex flex-row bg-[#ADBFDA]">
          <LeftSidebar />
          <section className="main-container">
            <div className="w-full max-w-4xl">{children}</div>
          </section>
          <div className="verticalLine"></div>
          <RightSidebar />
        </main>
        <Bottombar />
      </RainbowKitProviders>
    </html>
  );
}
