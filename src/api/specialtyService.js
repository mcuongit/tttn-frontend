import axios from "axios";
import { APP_URL } from "./_configApi";

export const createNewSpec = (data) => {
    return axios.post(`${APP_URL}/specialty`, data);
};

export const uploadSpecImg = (data) => {
    return axios.post(`${APP_URL}/specialty/upload`, data);
};

export const getSpecImg = () => {
    return axios.get(`${APP_URL}/specialty/image`);
};

export const getAllSpecs = () => {
    return axios.get(`${APP_URL}/specialty/`);
};
