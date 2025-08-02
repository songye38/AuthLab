"use client";

import React from "react";
import axios from "axios";
import { useState } from "react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);

  try {
    const response = await axios.post(
      "https://authlab-server-production.up.railway.app/login",
      { email, password },
      { headers: { "Content-Type": "application/json" } }  // 명시적으로 Content-Type 지정
    );

    console.log("response.status:", response.status);
    console.log("response.data:", response.data);

    const { access_token } = response.data;
    setToken(access_token);
    console.log("✅ Token:", access_token);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("❌ Login failed response:", err.response);
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    } else {
      console.error("❌ Unexpected error:", err);
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
      {token && (
        <div style={styles.tokenBox}>
          <strong>Access Token:</strong>
          <pre>{token}</pre>
        </div>
      )}
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
  tokenBox: {
    marginTop: 20,
    background: "#f7f7f7",
    padding: 10,
    borderRadius: 8,
    fontSize: 12,
    wordBreak: "break-word",
  },
};

export default LoginForm;
