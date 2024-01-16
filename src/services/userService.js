import http from "./httpServices";

const apiEndpoint = "http://localhost:3001/api/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
