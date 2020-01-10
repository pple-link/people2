import { apiClient } from "../utils/apiClient";
import { AxiosInstance } from "axios";

export abstract class BaseProvider {
  protected accessToken: string;
  protected instance: AxiosInstance | null;
  constructor() {
    this.accessToken = "";
    this.instance = null;
  }

  public setToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  public setInstance(url: string, headers: Object) {
    this.instance = apiClient(url, headers);
    this.instance.interceptors.response.use(
      response => response,
      err => Promise.reject(err)
    );
    console.log("instace ");
  }

  public getInstance() {
    return this.instance;
  }
}
