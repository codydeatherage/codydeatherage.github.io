import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: "https://frontend-take-home-service.fetch.com",
  timeout: 1000,
  withCredentials: true,
});

AxiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      sessionStorage.removeItem("favorites"); //cleanup session item
      (window as Window).location = "/login";
    }
    return Promise.reject(error);
  }
);
