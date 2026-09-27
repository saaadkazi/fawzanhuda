import { Cinzel, Cormorant_Garamond, Inter, Amiri } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Fawzan & Huda - Blessed Nikah Ceremony",
  description: "Together with their families, Fawzan & Huda request the honor of your presence at their blessed Nikah ceremony. Discover details, location, and countdown.",
  keywords: ["Fawzan and Huda Wedding", "Nikah Ceremony", "Islamic Wedding Invitation", "Wedding Invitation"],
  authors: [{ name: "Fawzan & Huda" }],
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', sizes: 'any' },
      { url: '/favicon.svg?v=2', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png?v=2', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192.png?v=2', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png?v=2', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=2',
    apple: [
      { url: '/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${inter.variable} ${amiri.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-brand-bg text-brand-dark min-h-full font-inter overflow-x-hidden selection:bg-brand-gold/30">
        {children}
      </body>
    </html>
  );
}

