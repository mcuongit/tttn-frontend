import axios from "axios";
import { APP_URL } from "./_configApi";
const url = APP_URL + "/auth";

export const authApi = {
  signIn: (payload) => {
    // Cái đường dẫn API này tuỳ thuộc vào BE của bạn cho cái nào thì dùng cái đó
    return axios.post(url + "/login", payload);
  },

  getMe: async (payload) => {
    const u = "/users/profile";
    const response = await axios.get(u + "/", payload);
    return response.data;
  },
};
