'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createUser } from './signup-server-action';
import styles from './signup.module.css';

export default function CreateAccount() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [form, setForm] = useState({ email: email, name: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const router=useRouter()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setServerError('');
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!form.email) newErrors.email = 'Enter your email';
    else if (!emailRegex.test(form.email)) newErrors.email = 'Enter a valid email';

    if (!form.name) newErrors.name = 'Enter your name';

    const password = form.password;
    if (!password) newErrors.password = 'Enter your password';
    else if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    else if (!/[A-Z]/.test(password))
      newErrors.password = 'Must contain at least one uppercase letter';
    else if (!/[a-z]/.test(password))
      newErrors.password = 'Must contain at least one lowercase letter';
    else if (!/[0-9]/.test(password))
      newErrors.password = 'Must contain at least one number';
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      newErrors.password = 'Must contain at least one special character';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const res = await createUser(form);
    if (res?.error) {
      setServerError(res.error);
    }
    else if(res.success){
        alert('User Created successful!\nLogin now');
        router.push(`/signin?email=${encodeURIComponent(form.email)}`);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create Account</h2>
      <p className={styles.required}>All fields are required</p>

      <form onSubmit={handleSubmit} noValidate>
        {serverError && <p className={styles.errorText}>{serverError}</p>}

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className={errors.email ? styles.errorInput : ''}
        />
        {errors.email && <p className={styles.errorText}>{errors.email}</p>}

        <label>Your name</label>
        <input
          type="text"
          name="name"
          placeholder="First and last name"
          value={form.name}
          onChange={handleChange}
          className={errors.name ? styles.errorInput : ''}
        />
        {errors.name && <p className={styles.errorText}>{errors.name}</p>}

        <label>Password (at least 6 characters)</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className={errors.password ? styles.errorInput : ''}
        />
        {errors.password && <p className={styles.errorText}>{errors.password}</p>}

        <p className={styles.note}>
          A verification message will be sent to your email.
        </p>

        <button type="submit" className={styles.button}>Verify email</button>

        <hr />

        <p className={styles.signInPrompt}>
          Already a customer? <a href="signin-or-signup">Sign in instead</a>
        </p>
      </form>
    </div>
  );
}
