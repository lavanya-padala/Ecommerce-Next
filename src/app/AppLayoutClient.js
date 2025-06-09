// src/app/AppLayoutClient.js
'use client'; // This directive is crucial for client-side hooks

import { usePathname } from 'next/navigation';
import Header from './header/header'; // Adjust path if your header component is elsewhere

// Define paths where the header should NOT be shown
const noHeaderPaths = ['/signin', '/signup', '/signin-or-signup']; // Make sure these match your actual sign-in/sign-up routes

export default function AppLayoutClient({ session, children }) {
  const pathname = usePathname();
  const showHeader = !noHeaderPaths.includes(pathname);

  return (
    <>
      {showHeader && <Header session={session} />}
      {children}
    </>
  );
}