"use client";

import Footer from "../components/Footer/page";
import Header from "../components/Header/page";
import ScrollToTop from "../components/ScrollToTop/page";
import { SessionProvider } from "next-auth/react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Header />
      {children}
      <Footer />
      <ScrollToTop />
    </SessionProvider>
  );
}