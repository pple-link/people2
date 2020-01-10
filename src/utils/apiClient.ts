import axios from "axios";
export const apiClient = (url: string, headers: Object) => {
  return axios.create({
    baseURL: url,
    headers: headers
  });
};
