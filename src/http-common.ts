import axios from "axios";
import { SERVER_LINK } from "./config-global";

const api = axios.create({
  baseURL: SERVER_LINK,
  headers: {
    "Content-type": "application/json",
  },
});

export default api;
