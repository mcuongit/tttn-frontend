import axios from "axios";
import callApi, { APP_URL } from "./_configApi";

const homeApi = (endpoint, method = "GET", data) => {
  return callApi("home", endpoint, method, data);
};

export const getTopDoctor = (endpoint) => {
  return homeApi(endpoint);
};

export const getTopDoctorEdit = (limit) => {
  return axios.get(APP_URL + "home/get-top-doctor/" + limit);
};
