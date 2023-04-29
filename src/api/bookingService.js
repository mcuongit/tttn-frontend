import axios from "axios";
import { APP_URL } from "./_configApi";

const BOOKING_URL = APP_URL + "/booking";

export const createBooking = (data) => {
    return axios.post(`${BOOKING_URL}/post-book-apointment`, data);
};

export const findPatientBooking = (doctorId, date) => {
    return axios.get(`${BOOKING_URL}/getPatientList/${doctorId}/${date}`);
};

export const finishBooking = (formData) => {
    return axios.post(`${BOOKING_URL}/finishBooking`, formData);
};
