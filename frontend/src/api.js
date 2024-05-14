//interceptor for request to add correct headers
//uses axios to send network requests
import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const apiUrl = "https://noted-web-app-db.railway.internal";
const api = axios.create({
  baseURL: apiUrl,
  //baseURL: import.meta.env.VITE_API_URL,
});

//checks local storage for access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
