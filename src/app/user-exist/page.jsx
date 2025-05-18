'use client';
import React, { useState } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import styles from './userexist.module.css';

export default function Page() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  return (
    <div className={styles.container}>
      <h2>Looks like you are new to amazon</h2>
      <div className={styles.emailRow}>
        <span>{email}</span>
        <a href="/signin-or-signup" className={styles.change}>Change</a>
      </div>
      <p>Lets create a account using your email</p>

      <button onClick={()=>redirect(`/signup?email=${encodeURIComponent(email)}`)} className={styles.button}>Proceed to create an account</button>
      <hr />
        <p>
          <strong>Already a customer?</strong>
        </p>
        <a href='/signin-or-signup' className={styles.signInBtn}>
          Sign in with another email or mobile
        </a>
    </div>
  );
}
