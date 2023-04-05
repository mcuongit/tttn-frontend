import axios from "axios";
import { APP_URL } from "./_configApi";

export const veriryEmail = (data) => {
    return axios.post(`${APP_URL}/booking/verify-booking`, data);
};
