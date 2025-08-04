
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  email: string;
  // 필요하면 여기에 더 추가 가능
}

const MePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<User>("https://authlab-server-production.up.railway.app/users/me", { withCredentials: true })
      .then(res => {
    console.log(res);
    setUser(res.data);
  })
      .catch(() => setError("인증 실패 또는 서버 에러"));
  }, []);

  if (error) return <div>{error}</div>;
  if (!user) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>내 정보</h2>
      <p>이메일: {user.email}</p>
      {/* 필요한 정보 더 보여주기 */}
    </div>
  );
};

export default MePage;
