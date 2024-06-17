import axios from "axios";

const SERVER_LINK = "http://192.168.0.160:3000";

const api = axios.create({
  baseURL: SERVER_LINK,
  headers: {
    "Content-type": "application/json",
  },
});

export default api;
