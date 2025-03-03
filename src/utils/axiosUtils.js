import axios from "axios";

export let axiosInstance = null;

export function createAxiosInstance() {
  const token = JSON.parse(localStorage.getItem("token"));

  axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {
      Authorization: token,
    },
  });
}
