import { Inter, Poppins } from "next/font/google";
import "./globals.css";
// import Navbar from "@/components/Navbar/Navbar";
import ScrollToTopBtn from "@/components/ScrollToTopBtn/ScrollToTopBtn";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes'
import { Toaster } from "@/components/ui/toaster"
import NextTopLoader from 'nextjs-toploader'
// import Footer from "@/components/Footer/Footer";
// import AOSInitiator from "@/lib/aos-initiator";
// import Link from "next/link";
// import CookieConsent from "@/components/CookieConsent/CookieConsent";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500"] });

export const metadata = {
  title: "InstaClip",
  description: "InstaClip generates short-form viral content instantly with AI. No more countless hours editing required.",
};

export default function RootLayout({ children }) {

  return (
    <ClerkProvider appearance={{
      baseTheme: shadesOfPurple,
    }}>
      <html lang="en">

        <body className={inter.className}>
          {/* <AOSInitiator>
    
        </AOSInitiator> */}
          <NextTopLoader
            color="#4A2AC0"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false}
          />
          {children}
          {/* <CookieConsent /> */}

          <ScrollToTopBtn />
          <Toaster />
        </body>

      </html>
    </ClerkProvider>
  );
}
