'use client'
import React, { useState } from 'react'
import styles from './reset-password-server-action.module.css'
import { resetPasswordAction  } from './reset-password-server-action';
import { useRouter } from 'next/navigation';

const page=({params})=> {
  const [password, setPassword] = useState("");
  const [reenterpassword, setReenterpassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
    return passwordRegex.test(password);
  };
  const resetPassword=async (e)=>{
    const token =await params.token;
    e.preventDefault();
     if (!validatePassword(password)) {
      return setError("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
    }
    if (password !== reenterpassword) {
      return setError("Passwords do not match");
    }
    try {
      const res = await resetPasswordAction(password, token);
      if (res.success) {
        alert("Password reset successful! Redirecting to login...");
        setTimeout(() => {
          router.push(`/signin?email=${encodeURIComponent(res.email)}`);
        }, 2000);
      }
    } catch (err) {
      if (err.message === "Invalid or expired token") {
        setError("Reset password link is invalid or expired. Please try requesting a new one.");
      } else {
        setError(err.message || "Something went wrong");
      }
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form onSubmit={resetPassword}>
          <h2>Reset Password</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <label htmlFor="input">Enter password</label>
          <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" required />
          <label htmlFor="input">Reneter password</label>
          <input type='password' value={reenterpassword} onChange={(e)=>setReenterpassword(e.target.value)} placeholder="Reenter Password" required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default page
