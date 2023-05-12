import axios from "axios";
import callApi, { APP_URL } from "./_configApi";

const url = APP_URL + "/schedule";

const scheduleApi = (endpoint, method = "GET", data) => {
    return callApi("schedule", endpoint, method, data);
};

export const saveSchedule = (data) => {
    return scheduleApi("", "POST", data);
};

export const getScheduleByDate = (endpoint) => {
    return scheduleApi(endpoint, "GET");
};

export const findSchedule = (doctorId, date) => {
    return axios.get(`${url}/get-by-date/${doctorId}/${date}`);
};

export const deleteSchedule = (id) => {
    return axios.delete(`${url}/${id}`);
};
