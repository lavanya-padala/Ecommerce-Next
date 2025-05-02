import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// export async function generateViewport() {
// return {
//   width: 'device-width',
//   initialScale: 1,
// };
// }



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tara",
  description: "Ecommerce Application",
  icons: {
    icon: [
      { url: '/tara.png' ,sizes: '16x16'}
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
