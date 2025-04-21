import { Inter } from "next/font/google";
import ClientLayout from "./ClientLayout";
import "./globals.css"; // Yolun düzeltilmiş hali

// Metadata tanımlaması
export const metadata = {
  title: 'TetriX - Multiplayer Tetris Experience',
  description: 'Challenge yourself with the ultimate multiplayer Tetris experience',
  icons: {
    icon: "/logo.png",
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}