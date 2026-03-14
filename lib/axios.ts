import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://dbs-website.ratoguras.com/api",
  timeout: 10000, // prevent hanging requests
  headers: {
    "Content-Type": "application/json",
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