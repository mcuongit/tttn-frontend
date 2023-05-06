import axios from "axios";
import { APP_URL } from "./_configApi";

const url = `${APP_URL}/notification`;

export const findAllNotification = () => {
    return axios.get(url);
};

export const createNotification = (data) => {
    return axios.post(url, data);
};

export const deleteNotification = (id) => {
    return axios.delete(`${url}/${id}`);
};

export const findOneNotification = (id) => {
    return axios.get(`${url}/${id}`);
};

export const updateNotification = (id, data) => {
    return axios.patch(`${url}/${id}`, data);
};

export const findAllNotificationByDate = (date) => {};
