import ScrollUp from "../components/Common/ScrollUp";
import Features from "../components/Features/page";
import Hero from "../components/Hero/page";
import HowToPlay from "@/components/HowToPlay/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TetriX - Multiplayer Tetris Game",
  description: "Challenge your friends in real-time multiplayer Tetris battles!",
  openGraph: {
    title: "TetriX - Multiplayer Tetris Game",
    description: "Challenge your friends in real-time multiplayer Tetris battles!",
    url: "https://tetrix.com",
    siteName: "TetriX",
    images: [
      {
        url: "https://tetrix.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "TetriX - Multiplayer Tetris Game",
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <HowToPlay />
    </>
  );
}