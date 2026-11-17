import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/content";
import { Milonga } from "next/font/google";
import ClickFeedback from "@/components/ClickFeedback";

const display = Milonga({
  subsets: ["latin"],
  weight: "400", // Milonga only has one weight
  variable: "--font-display",
});

export const metadata = {
  title: `${site.name} | Web design studio`,
  description: site.tagline,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={display.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative overflow-x-clip">
        <ClickFeedback />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}



