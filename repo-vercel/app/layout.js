import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "API by Example — Learn APIs by Building Real Projects",
  description:
    "Every project comes with a ready-to-use code snippet and a full Next.js app deployed on Vercel. No theory walls — just working code.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${dmSans.variable} ${jetBrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}