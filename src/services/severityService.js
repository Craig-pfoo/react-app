import http from "./httpServices";
import config from "../config.json";

export function getSeverities() {
  return http.get(config.apiUrl + "/severities");
}
