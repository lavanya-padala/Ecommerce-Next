'use client';
import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import styles from './signin.module.css';
import { checkVerifiedUserAction } from './checkVerifiedUserAction';


export default function SignIn() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get('email') || '';

  const handleSignIn = async () => {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error); // This comes from `throw new Error(...)` in authorize
    } else {
      const response = await checkVerifiedUserAction(email);
      if(response.verified){
        router.push('/');
      }
      else{
        router.push(`/verify-email?email=${encodeURIComponent(email)}`)
      }
    }
  };

 return (
  <div className={styles.pageWrapper}>
    <div className={styles.container}>
      <h2>Sign in</h2>

      <div className={styles.emailRow}>
        <span>{email}</span>
        <a href={`/signin-or-signup?email=${encodeURIComponent(email)}`} className={styles.change}>Change</a>   
      </div>

      <div className={styles.inputRow}>
        <label>Password</label>
        <a href={`/forgot-password?email=${encodeURIComponent(email)}`} className={styles.change}>Forgot Password?</a>   
      </div>

      <input
        type="password"
        className={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <div className={styles.error}>{error}</div>}

      <button className={styles.button} onClick={handleSignIn}>Sign in</button>
    </div>
  </div>
);

}
