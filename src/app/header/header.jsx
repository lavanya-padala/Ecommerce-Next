'use client';

import React, { useState } from 'react';
import styles from './header.module.css';
import { signOut } from 'next-auth/react';

export default function Header({ session }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <div className={styles.logo}>
          <img src="/tara-logo.png" alt="TARA" />
        </div>
        <div className={styles.search}>
          <input type="text" placeholder="Search for products..." />
        </div>
        <div className={styles.menuToggle} onClick={toggleMenu}>
          ☰
        </div>
      </div>

      <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
        <a href="/men">Men</a>
        <a href="/women">Women</a>
        <a href="/kids">Kids</a>
        <a href="/sportswear">Sportswear</a>
        <a href="/bags">Bags</a>
        <a href='/favourites'>❤ Wishlist</a>
        <a href='/cart'>🛒 Cart</a>
        {session?.user?.name ? (
          <div
            className={styles.userMenu}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span style={{ cursor: 'pointer' }}>👋 Welcome, {session.user.name}</span>
            {dropdownOpen && (
              <div className={styles.dropdownt}>
                <a onClick={handleSignOut} style={{ cursor: 'pointer' }}>
                  {/* Add the image here */}
                  <img src="/sign_out.png" alt="Sign Out Icon" className={styles.signOutIcon} />
                  Sign Out
                </a>
              </div>
            )}
          </div>
        ) : (
          <a href='/'>👤 Sign Up</a>
        )}
      </nav>
    </header>
  );
}