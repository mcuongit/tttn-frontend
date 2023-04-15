import callApi from "./_configApi";

const doctorApi = (endpoint, method = "GET", data) => {
    return callApi("doctor", endpoint, method, data);
};

const doctorInfoApi = (endpoint, method = "GET", data) => {
    return callApi("doctor-info", endpoint, method, data);
};

export const getAllDoctor = (endpoint) => {
    return doctorApi(endpoint, "GET");
};

export const saveDoctorInfo = (endpoint, data) => {
    return doctorApi(endpoint, "post", data);
};

export const getDetailDoctor = (endpoint) => {
    return doctorApi(endpoint, "GET");
};

export const createDoctorInfo = (data) => {
    return doctorInfoApi("", "POST", data);
};

export const getMoreDoctorInfo = (endpoint) => {
    return doctorInfoApi(endpoint, "GET");
};

export const getBySpecId = (id, province) => {
    return doctorInfoApi(`get-by-spec/${id}/${province}`, "get");
};

export const getDoctorProfile = (endpoint) => {
    return doctorApi(endpoint, "GET");
};
