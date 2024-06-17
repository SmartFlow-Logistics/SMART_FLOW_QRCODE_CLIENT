import axios from "axios";

<<<<<<< HEAD
const SERVER_LINK = "http://192.168.0.160:3000";
=======
const SERVER_LINK = "http://localhost:3004";
>>>>>>> 7114d7973c66f8b647033dc94788a074a3fd561c

const api = axios.create({
  baseURL: SERVER_LINK,
  headers: {
    "Content-type": "application/json",
  },
});

export default api;
