'use cache'

import FAQ from "@/components/HomePage/FAQ/FAQ";
import Footer from "@/components/HomePage/Footer/Footer";
import FooterBottom from "@/components/HomePage/FooterBottom/FooterBottom";
import Hero from "@/components/HomePage/Hero/Hero";
import JoinDiscordCommunity from "@/components/HomePage/JoinDiscordCommunity/JoinDiscordCommunity";
import Navbar from "@/components/HomePage/Navbar/Navbar";
import Pricing from "@/components/HomePage/Pricing/Pricing";

export default function Home() {
  return (
    <main className="bg-[#000d18]">
      <Navbar />
      <Hero />
      <Pricing />
      <FAQ />
      <JoinDiscordCommunity />
      <Footer />
      <FooterBottom />
    </main>
  );
}
