import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  IBM_Plex_Mono,
  Plus_Jakarta_Sans,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import { Navbar } from "@/component/navbar";
import { CustomCursor } from "@/component/CustomCursor";
import { Footer } from "@/component/Footer";
import { SiteBackground } from "@/component/SiteBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

// Display face for the logo and headline
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

// Data face for small labels and money figures
const plexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

const description =
  "Lock savings for up to 12% p.a., set goals that stick, and still have instant transfers, cards, and bill payments in the same app.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.securevests.com"),
  title: {
    default: "SecureVest: Save with discipline. Spend with ease.",
    template: "%s | SecureVest",
  },
  description,
  openGraph: {
    siteName: "SecureVest",
    title: "SecureVest: Save with discipline. Spend with ease.",
    description,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} ${spaceGrotesk.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="relative isolate min-h-full flex flex-col text-[#0F2B22]">
        <SiteBackground />
        <CustomCursor />
        <Navbar />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
