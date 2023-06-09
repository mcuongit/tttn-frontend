import axios from "axios";
import { APP_URL } from "./_configApi";
const url = APP_URL + "/patient";

export const findByMail = (email) => {
  return axios.get(url + "/findByEmail/" + email);
};
