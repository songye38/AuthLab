import axios from "axios";

// 기본 axios 인스턴스
const api = axios.create({
  baseURL: "https://authlab-server-production.up.railway.app",
  withCredentials: true, // 쿠키 포함 필수
});

interface FailedRequest {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];


const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 응답 인터셉터
api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    // 액세스 토큰 만료 + /refresh가 아닌 경우
    if (err.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes("/refresh")) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            return api(originalRequest);
          })
          .catch(error => {
            return Promise.reject(error);
          });
      }

      isRefreshing = true;

      try {
        await api.post("/refresh"); // refresh 요청
        processQueue(null);
        return api(originalRequest); // 원래 요청 재시도
      } catch (refreshError) {
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default api;
