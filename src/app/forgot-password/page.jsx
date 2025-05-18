'use client';
import React, { useActionState } from 'react';
import styles from './forgot-password.module.css';
import { useSearchParams } from 'next/navigation';
import { forgotPasswordAction } from './forgot-password-server-action';

function Page() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || '';
  const [state, formAction] = useActionState(forgotPasswordAction, null);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form action={formAction}>
          <h2>Forgot Password</h2>
          <p className={styles.note}>
            Enter email address associated with your TARA account
          </p>
          <label htmlFor="input">Enter email</label>
          <input
            id="input"
            name="email"
            type="email"
            placeholder="Your email"
            defaultValue={emailParam}
            required
          />
          <button type="submit">Continue</button>
        </form>

        {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
      </div>
    </div>
  );
}

export default Page;
