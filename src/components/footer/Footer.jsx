import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>@2023 BlogMedia. All rights reserved.</div>
      <div className={styles.social}>
        <Image
          src="/1.png"
          alt="facebook image"
          className={styles.icon}
          width={15}
          height={15}
        />
        <Image
          src="/2.png"
          alt="instagram image"
          className={styles.icon}
          width={15}
          height={15}
        />
        <Image
          src="/3.png"
          alt="twitter image"
          className={styles.icon}
          width={15}
          height={15}
        />
        <Image
          src="/4.png"
          alt="youtube image"
          className={styles.icon}
          width={15}
          height={15}
        />
      </div>
    </div>
  );
};

export default Footer;
