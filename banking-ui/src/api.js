import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "http://localhost:8081/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export const fetchAccounts = () => api.get("/accounts");

export const createAccount = (payload) => api.post("/accounts", payload);

export const updateAccount = (id, payload) => api.put(`/accounts/${id}`, payload);

export const deleteAccount = (id) => api.delete(`/accounts/${id}`);

export default api;
