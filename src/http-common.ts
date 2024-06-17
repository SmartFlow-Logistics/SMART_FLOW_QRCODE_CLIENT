import axios from "axios";

const SERVER_LINK = "http://localhost:3004";

const api = axios.create({
  baseURL: SERVER_LINK,
  headers: {
    "Content-type": "application/json",
  },
});

export default api;
