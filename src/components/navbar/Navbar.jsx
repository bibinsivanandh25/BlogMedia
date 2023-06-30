"use client";
import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

const Navbar = () => {
  const session = useSession();
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/icon.png"
          alt="icon image"
          width={35}
          height={30}
          className={styles.iconImg}
        />
        <span className={styles.iconTitle}>BlogMedia</span>
      </Link>
      <div className={styles.links}>
        <DarkModeToggle />
        {links.map((link) => (
          <Link key={link.id} href={link.url} className={styles.link}>
            {link.title}
          </Link>
        ))}
        {session.status === "authenticated" && (
          <button onClick={() => signOut()} className={styles.logout}>
            Logout
          </button>
        )}
        {(session.status === "authenticated" && session.data.user.image && (
          <Image
            src={session.data.user.image}
            alt="user image"
            width={30}
            height={30}
            className={styles.userImg}
          />
        )) ||
          (session?.data?.user.name && (
            <span className={styles.userTitle}>
              {session?.data?.user?.name.charAt(0)}
            </span>
          ))}
      </div>
    </div>
  );
};

export default Navbar;
