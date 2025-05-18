'use client';
import React,{useActionState} from 'react';
import styles from "./signInorSignUp.module.css";
import { checkUserExist } from './signin-or-signup-server-action';
import { useSearchParams } from 'next/navigation';

function Page() {
    const [state, formAction] = useActionState(checkUserExist, null);
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form action={formAction}>
          <h2>Sign in or create account</h2>
          <label htmlFor="input">Enter email</label>
          <input id="input" name="email" type="text" placeholder="Your email" defaultValue={email} required />
          <button type="submit">Continue</button>
        </form>
        {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
      </div>
    </div>
  );
}

export default Page;
