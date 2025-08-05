"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // ✅ 로그인 여부 확인용
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get("https://authlab-server-production.up.railway.app/users/me", {
          withCredentials: true, // 쿠키 포함
        });

        if (res.status === 200) {
          // 이미 로그인된 상태면 바로 /me로 이동
          window.location.href = "/me";
        }
      } catch (err) {
        // 로그인 안 되어 있음 (silent fail)
        console.log("Not logged in");
      }
    };

    checkLogin();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "https://authlab-server-production.up.railway.app/users/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("로그인 성공:", response.data);

      // 로그인 성공 시 이동
      window.location.href = "/me";
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Login failed:", err.response);
        setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else {
        console.error("Unexpected error:", err);
        setError("알 수 없는 에러가 발생했습니다.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>로그인</button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 400,
    margin: "100px auto",
    padding: 20,
    border: "1px solid #ccc",
    borderRadius: 12,
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  input: {
    padding: "10px 12px",
    fontSize: 16,
    borderRadius: 8,
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 12px",
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: "#4a90e2",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  error: {
    marginTop: 12,
    color: "crimson",
  },
};

export default LoginForm;
