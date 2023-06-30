"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";
import styles from "./post.module.css";
import Image from "next/image";

const Dashboard = () => {
  const session = useSession();
  console.log(session);
  const router = useRouter();

  // NEW WAY TO FETCH DATA
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user.name}`,
    fetcher
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target[0].value;
    const desc = e.target[1].value;
    const image = e.target[2].value;
    const content = e.target[3].value;

    try {
      await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          desc,
          image,
          content,
          username: session.data.user.name,
        }),
      });
      mutate();
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router.push("/dashboard/login");
  }

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading
            ? "Loading..."
            : data?.map((post) => (
                <div className={styles.post} key={post._id}>
                  <div className={styles.imgContainer}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={200}
                      height={100}
                      className={styles.img}
                    />
                  </div>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <span
                    className={styles.delete}
                    onClick={() => deleteHandler(post._id)}
                  >
                    X
                  </span>
                </div>
              ))}
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.title}>Add New Post</h1>
          <input placeholder="Title" className={styles.input} type="text" />
          <input placeholder="Desc" className={styles.input} type="text" />
          <input placeholder="Image" className={styles.input} type="text" />
          <textarea
            className={styles.textArea}
            cols={30}
            rows={10}
            placeholder="Content"
          />
          <button className={styles.button}>Send</button>
        </form>
      </div>
    );
  }
};

export default Dashboard;
