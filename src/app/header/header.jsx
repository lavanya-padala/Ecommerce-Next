'use client';
import React, { useState } from 'react';
import styles from './header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
  </nav>

  <div className={styles.icons}>
    <a href='/register'>👤 Sign Up</a>
    <a href='/favourites'>❤ Wishlist</a>
    <a href='/cart'>🛒 Cart</a>
  </div>
</header>
  );
}
