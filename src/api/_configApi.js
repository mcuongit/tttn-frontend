import axios from "axios";

const APP_URL = import.meta.env.VITE_BACKEND_URL;

const callApi = async (controller, endpoint, method, data) => {
    try {
        return await axios({
            method: method,
            url: `${APP_URL}/${controller}/${endpoint}`,
            data: data,
        });
    } catch (e) {
        console.log(e);
    }
};

export default callApi;
