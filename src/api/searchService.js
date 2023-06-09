import axios from "axios";
import { APP_URL } from "./_configApi";
const url = APP_URL + "/users/search";

export const searchDoctor = (query) => {
  return axios.get(url + "/" + query);
};
