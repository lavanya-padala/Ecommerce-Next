'use client';
import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './forgot-password.module.css';
import { forgotPasswordAction } from './forgot-password-server-action';

function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultEmail = searchParams.get('email') || '';
  const [email, setEmail] = useState(defaultEmail);
  const [state, formAction] = React.useActionState(forgotPasswordAction, null);

  React.useEffect(() => {
    if (state?.success) {
      alert('Reset link sent to your email!');
      router.push(`/signin?email=${encodeURIComponent(email)}`);
    }
  }, [state, router, email]);

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
            value={email}
            onChange={(e) => setEmail(e.target.value)} // ✅ capture the value
            required
          />
          {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
}

export default Page;
