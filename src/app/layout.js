// src/app/layout.js
// This file should NOT have 'use client' at the top.
// It's a Server Component by default.

import "./globals.css"; // Keep your global styles
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // For fetching session
import { getServerSession } from "next-auth";

// Import your AppLayoutClient (which is a 'use client' component)
import AppLayoutClient from './AppLayoutClient'; // Assuming AppLayoutClient is in the same directory as layout.js

export const metadata = {
  title: "Tara",
  description: "Ecommerce Application",
  icons: {
    icon: [
      { url: '/tara.png' ,sizes: '16x16'}
    ],
  },
};

export default async function RootLayout({ children }) {
  // Fetch session on the server side
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        {/* Pass the fetched session and children to the client component */}
        <AppLayoutClient session={session}>
          {children}
        </AppLayoutClient>
      </body>
    </html>
  );
}