"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState(false);

  const { name, email, password } = formData;

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      res.status === 201 &&
        router.push("/dashboard/login?success=Account has been created");
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="username"
          required
          name="name"
          value={name}
          onChange={handleChange}
        />
        <input
          className={styles.input}
          type="email"
          placeholder="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
        />
        <button className={styles.button}>Register</button>
      </form>
      {err && <p>Something went wrong</p>}
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/dashboard/login">
        Login with an existing account
      </Link>
    </div>
  );
};

export default Register;
