import axios, { AxiosResponse } from "axios";
import Utils from "../utils";

const axiosClient = axios.create({
  baseURL: "https://plankton-app-8lzob.ondigitalocean.app/admin",
  headers: {
    "Content-type": "application/json",
  },
});

let lastClickTime = 0;
const CLICK_DELAY = 1000;

// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const currentTime = Date.now();
  if (currentTime - lastClickTime < CLICK_DELAY) {
    Utils.notification.error('지속적으로 누르지 마십시오')
    throw new Error("Too many requests");
  }

  lastClickTime = currentTime;
  return config;
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      window.location.replace("/");
      localStorage.clear();
      throw new Error("Unauthorized");
    }
    throw err;
  }
);

export default axiosClient;
