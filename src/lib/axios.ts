import axios from "axios";

// const headers = [
//   ["Content-Type", "text/html", "extra"],
//   ["Accept"],
// ];
// fetch('https://example.com/', { headers });

export const api = axios.create({
  baseURL:"http://localhost:3333"
})