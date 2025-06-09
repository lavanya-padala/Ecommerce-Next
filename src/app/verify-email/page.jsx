'use client';
import { useState, useEffect } from 'react';
import styles from './verify-email.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyEmailServerAction } from './verify-email-server-action';
import { resetCodeAction } from './resendCodeAction';

export default function VerifyCodePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get('email') || '';
    const [code, setCode] = useState('');
    const [timer, setTimer] = useState(60);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
  

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const response=await verifyEmailServerAction(email,code);
    if(response?.error){
        setError(response.error)
    }
    else if(response.success){
        alert("Email verified Succesfully");
        router.push(`/signin?email=${encodeURIComponent(email)}`)
    }
  };

  const handleResendCode=async()=>{
    const response=await resetCodeAction(email);
    if(response?.error){
        setError(response.error)
    }
    else{
        alert("Code Sent Successfully!");
    }
  }


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Enter verification code</h2>
      <p className={styles.subtitle}>We sent a code to your email</p>
      <form onSubmit={handleSubmit}>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className={styles.input}
          placeholder="Enter code"
          required
        />

        {timer > 0 ? (
          <p className={styles.timer}>Please wait {timer} seconds before requesting another code.</p>
        ) : (
          <a className={styles.change} onClick={handleResendCode}>
            Resend Code
          </a>
        )}

        <button type="submit" className={styles.button}>
          Submit Code
        </button>

        {error && <p className={styles.error}>{error}</p>}
        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
}
