import axios from "axios";
import { APP_URL } from "./_configApi";
const url = APP_URL + "/post";

export const createPost = (data) => {
    return axios.post(url, data);
};

export const findAllPost = () => {
    return axios.get(url);
};

export const findOnePost = (id) => {
    return axios.get(`${url}/${id}`);
};

export const updatePost = (id, data) => {
    return axios.patch(`${url}/${id}`, data);
};

export const removePost = (id) => {
    return axios.delete(`${url}/${id}`);
};

export const uploadPostImg = (data) => {
    return axios.post(`${url}/upload`, data);
};

export const findPostLimit = (limit = 3) => {
    return axios.get(`${url}/get-post/${limit}`);
};

export const findPostByCatSlug = (slug) => {
    return axios.get(`${url}/findByCatSlug/${slug}`);
};
