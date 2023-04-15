import axios from "axios";
import { APP_URL } from "./_configApi";

const url = `${APP_URL}/clinic`;

export function createNewClinic(data) {
    return axios.post(url, data);
}

export function updateClinicById(id, data) {
    return axios.patch(`${url}/${id}`, data);
}

export function uploadClinicImage(data) {
    return axios.post(`${url}/upload`, data);
}

export const findAllClinic = () => {
    return axios.get(url);
};

export const removeClinic = (id) => {
    return axios.delete(`${url}/${id}`);
};

export const findOneClinic = (id) => {
    return axios.get(`${url}/${id}`);
};
