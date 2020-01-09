import axios from "axios";
export const apiClient = (url: string) => {
  return axios.create({
    baseURL: url,
    responseType: "json",
    headers: {
      "Content-Type": "application/json"
    }
  });
};
