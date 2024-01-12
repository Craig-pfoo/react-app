import { func } from "joi";
import http from "./httpServices";

const apiEndpoint = "http://localhost:3001/api/tasks";

export function getTasks() {
  return http.get(apiEndpoint);
}

export function getTask(id) {
  return http.get(apiEndpoint + "/" + id);
}

export function saveTask(task) {
  if (task._id) {
    const body = { ...task };
    delete body._id;
    return http.put(apiEndpoint + "/" + task._id, body);
  }
  return http.post(apiEndpoint, task);
}

export function deleteTask(id) {
  return http.delete(apiEndpoint + "/" + id);
}
