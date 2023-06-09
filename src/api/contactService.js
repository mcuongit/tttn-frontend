import axios from "axios";
import { APP_URL } from "./_configApi";
const url = APP_URL + "/contact";

export const createContact = (data) => {
  return axios.post(url, data);
};

export const findAllContact = () => {
  return axios.get(url);
};

export const removeContact = (id) => {
  return axios.delete(url + "/" + id);
};

export const findOneContact = (id) => {
  return axios.get(url + "/" + id);
};

export const updateContact = (id, data) => {
  return axios.patch(`${url}/${id}`, data);
};
