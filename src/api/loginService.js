import callApi, { axiosClient } from "./_configApi";
import { APP_URL } from "./_configApi";

const loginApi = (endpoint, method = "GET", data) => {
  return callApi("login", endpoint, method, data);
};

export const handleLoginService = (endpoint = "", data) => {
  return loginApi(endpoint, "POST", data);
};

export const handleAuth = (data) => {
  const url = APP_URL + "/auth/login";
  return axiosClient.post(url, data);
};
