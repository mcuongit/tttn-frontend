import axios from "axios";
import { APP_URL } from "./_configApi";
const url = APP_URL + "/category";

export const createCategory = (data) => {
    return axios.post(url, data);
};

export const findOneBySlug = (slug) => {
    const u = url + "/findOneBy/" + slug;
    return axios.get(u);
};

export const findAllCategory = () => {
    return axios.get(url);
};

export const findOneCategory = (id) => {
    return axios.get(`${url}/${id}`);
};

export const updateCategory = (id, data) => {
    return axios.patch(`${url}/${id}`, data);
};

export const removeCategory = (id) => {
    return axios.delete(`${url}/${id}`);
};
