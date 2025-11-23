import { MiniKitProvider } from "@worldcoin/minikit-js/minikit-provider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default async function Root({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MiniKitProvider>{children}</MiniKitProvider>
      </body>
    </html>
  );
}