import { AxiosInstance as axios } from "../../Axios";
import { LoginRequest } from "./auth.model";

const AUTH_BASE = "/auth";

export const authService = {
  login: async (form: LoginRequest) => {
    try {
      const res = await axios.post(AUTH_BASE + "/login", form);
      return res?.data;
    } catch (e) {
      console.error(e);
    }
  },
};
