import Link from "next/link";
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

//?static meta data

export const metadata = {
  title: "Blog",
  description: "This is the blog page",
};

const Blog = async () => {
  const data = await getData();
  console.log(data);
  return (
    <div className={styles.mainContainer}>
      {data?.map((item) => (
        <Link
          href={`/blog/${item._id}`}
          className={styles.container}
          key={item._id}
        >
          <div className={styles.imgContainer}>
            <Image
              src={item?.image}
              width={400}
              height={250}
              alt="blog image"
              className={styles.img}
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{item?.title}</h1>
            <p className={styles.desc}>{item?.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Blog;
