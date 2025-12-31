import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5001/api",
  timeout: 15000,
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("portfolio_admin_token", token);
  } else {
    delete api.defaults.headers.common.Authorization;
    localStorage.removeItem("portfolio_admin_token");
  }
}

export function loadSavedToken() {
  const token = localStorage.getItem("portfolio_admin_token");
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return token;
  }
  return null;
}

export default api;
