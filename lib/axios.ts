import axios from "axios";

axios.defaults.timeout = 30000;

const api = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_URL || "https://dbs-website.ratoguras.com/api").replace(/\/$/, ""),
  timeout: 30000, // Increase timeout for production builds
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error?.message);
    return Promise.reject(error);
  }
);

export default api;