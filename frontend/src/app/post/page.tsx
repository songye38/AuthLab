
"use client";

import React, { useState } from "react";

interface PostData {
  title: string;
  content: string;
}

const CreatePost: React.FC = () => {
  const [post, setPost] = useState<PostData>({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("https://authlab-server-production.up.railway.app/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 인증은 쿠키에 토큰이 들어가 있으니까 따로 Authorization 헤더는 필요 없을 수도 있음
        },
        credentials: "include", // 쿠키 포함해서 요청 보냄
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        throw new Error("글 작성에 실패했어ㅠ");
      }

      setSuccess(true);
      setPost({ title: "", content: "" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>새 글 작성</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            name="title"
            type="text"
            value={post.title}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8, margin: "8px 0" }}
          />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            required
            rows={6}
            style={{ width: "100%", padding: 8, margin: "8px 0" }}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "작성 중..." : "글 쓰기"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>글이 성공적으로 작성되었어!</p>}
    </div>
  );
};

export default CreatePost;
