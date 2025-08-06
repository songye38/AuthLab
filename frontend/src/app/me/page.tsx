"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";

interface User {
  email: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
}

const MePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);


  //기존 axios 인스턴스 사용 버전
  // useEffect(() => {
  //   axios.get<User>("https://authlab-server-production.up.railway.app/users/me", { withCredentials: true })
  //     .then(res => setUser(res.data))
  //     .catch(() => setError("인증 실패 또는 서버 에러"));
  // }, []);

  // useEffect(() => {
  //   if (!user) return;

  //   setLoadingPosts(true);
  //   axios.get<Post[]>("https://authlab-server-production.up.railway.app/posts/mine", { withCredentials: true })
  //     .then(res => setPosts(res.data))
  //     .catch(() => setError("내 게시글을 불러오지 못했습니다."))
  //     .finally(() => setLoadingPosts(false));
  // }, [user]);

  // 유저 정보 요청
useEffect(() => {
  api.get<User>("/users/me")
    .then(res => setUser(res.data))
    .catch(() => setError("인증 실패 또는 서버 에러"));
}, []);

// 내 게시글 요청
useEffect(() => {
  if (!user) return;

  setLoadingPosts(true);
  api.get<Post[]>("/posts/mine")
    .then(res => setPosts(res.data))
    .catch(() => setError("내 게시글을 불러오지 못했습니다."))
    .finally(() => setLoadingPosts(false));
}, [user]);


  if (error) return <div style={styles.error}>{error}</div>;
  if (!user) return <div style={styles.loading}>로딩 중...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>내 정보</h2>
      <p style={styles.email}><strong>이메일:</strong> {user.email}</p>

      <h3 style={styles.subtitle}>내가 쓴 글 목록</h3>
      {loadingPosts ? (
        <p style={styles.loading}>글 목록을 불러오는 중...</p>
      ) : posts.length === 0 ? (
        <p style={styles.noPosts}>작성한 글이 없습니다.</p>
      ) : (
        <ul style={styles.postList}>
          {posts.map(post => (
            <li key={post.id} style={styles.postItem}>
              <h4 style={styles.postTitle}>{post.title}</h4>
              <p style={styles.postContent}>{post.content.substring(0, 150)}...</p>
            </li>
          ))}
        </ul>
      )}

      <button
        style={styles.logoutBtn}
        onClick={async () => {
          try {
            const res = await fetch("https://authlab-server-production.up.railway.app/users/logout", {
              method: "POST",
              credentials: "include",
            });
            if (!res.ok) throw new Error("로그아웃 실패");
            console.log("로그아웃 성공");
            window.location.href = "/";
          } catch (error) {
            console.error("로그아웃 중 에러 발생:", error);
          }
        }}
      >
        로그아웃
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 700,
    margin: "40px auto",
    padding: 20,
    backgroundColor: "#f9f9fb",
    borderRadius: 12,
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    color: "#222",
    borderBottom: "2px solid #4a90e2",
    paddingBottom: 6,
  },
  subtitle: {
    fontSize: 22,
    marginTop: 30,
    marginBottom: 12,
    color: "#4a90e2",
  },
  email: {
    fontSize: 18,
    marginBottom: 20,
  },
  postList: {
    listStyleType: "none",
    padding: 0,
  },
  postItem: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 15,
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.2s ease",
    cursor: "default",
  },
  postItemHover: {
    transform: "scale(1.02)",
  },
  postTitle: {
    fontSize: 20,
    marginBottom: 6,
    color: "#333",
  },
  postContent: {
    fontSize: 16,
    color: "#666",
    lineHeight: 1.4,
  },
  logoutBtn: {
    marginTop: 30,
    padding: "12px 25px",
    fontSize: 16,
    fontWeight: "600",
    borderRadius: 8,
    border: "none",
    backgroundColor: "#e74c3c",
    color: "white",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(231, 76, 60, 0.4)",
    transition: "background-color 0.3s ease",
  },
  loading: {
    textAlign: "center",
    fontSize: 18,
    color: "#999",
  },
  noPosts: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#777",
  },
  error: {
    color: "crimson",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginTop: 40,
  },
};

export default MePage;
