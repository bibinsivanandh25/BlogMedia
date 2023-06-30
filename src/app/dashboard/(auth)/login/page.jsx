"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const router = useRouter();
  const session = useSession();
  const [err, setErr] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    router.push("/dashboard");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/",
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
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
        <button className={styles.button}>Login</button>
      </form>
      {err && <p>Something went wrong!</p>}
      <button
        onClick={() => {
          signIn("google", { callbackUrl: "/" });
        }}
        className={styles.button + " " + styles.google}
      >
        Login with Google
      </button>
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/dashboard/register">
        Create new account
      </Link>
      <button
        onClick={() => {
          signIn("github", { callbackUrl: "/" });
        }}
        className={styles.button + " " + styles.github}
      >
        Login with Github
      </button>
    </div>
  );
};

export default Login;
