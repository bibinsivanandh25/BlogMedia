import React from "react";
import styles from "./button.module.css";
import Link from "next/link";

const Button = ({ title, url }) => {
  return (
    <Link href={url}>
      <div className={styles.container}>{title}</div>
    </Link>
  );
};

export default Button;
