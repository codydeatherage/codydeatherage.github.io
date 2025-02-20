import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: "https://frontend-take-home-service.fetch.com",
  timeout: 1000,
  withCredentials: true,
});

AxiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      (window as Window).location = "/login";
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
