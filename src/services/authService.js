import http from "./httpServices";
import { jwtDecode } from "jwt-decode";

const apiEndpoint = "http://localhost:3001/api/auth";
const tokenKey = "token";

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

const authDefaults = {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};

export default authDefaults;
