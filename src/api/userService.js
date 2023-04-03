import axios from "axios";
import callApi from "./_configApi";

const userApi = (endpoint, method = "GET", data) => {
    return callApi("users", endpoint, method, data);
};

const deleteMultipleRecord = (endpoint, data) => {
    return userApi(endpoint, "DELETE", data);
};

const getAllUsers = (endpoint) => {
    return userApi(endpoint);
};

const getOneUser = (endpoint) => {
    return userApi(endpoint);
};

const addNewUser = (endpoint, data) => {
    return userApi(endpoint, "POST", data);
};

const deleteUser = (endpoint) => {
    return userApi(endpoint, "DELETE");
};

const updateUserService = (endpoint, data) => {
    return userApi(endpoint, "PATCH", data);
};

const updateUserImgService = (endpoint, data) => {
    return userApi(endpoint, "PUT", data);
};

const uploadImg = (endpoint, data) => {
    return userApi(endpoint, "POST", data);
};

const getAllcodeService = (data) => {
    return axios.get(`http://localhost:5000/allcode/${data}`);
};

const getAllDoctor = (endpoint) => {
    return callApi("doctor", endpoint, "GET");
};

const saveDoctorInfo = (endpoint, data) => {
    return callApi("doctor", endpoint, "POST", data);
};

const getDetailDoctor = (endpoint) => {
    return callApi("doctor", endpoint, "GET");
};

const getMarkdown = (endpoint) => {
    return callApi("markdown", endpoint, "GET");
};

const updateMarkdown = (endpoint, data) => {
    return callApi("markdown", endpoint, "PATCH", data);
};

export {
    getAllUsers,
    addNewUser,
    deleteUser,
    updateUserService,
    getAllcodeService,
    uploadImg,
    updateUserImgService,
    getOneUser,
    deleteMultipleRecord,
    getAllDoctor,
    saveDoctorInfo,
    getDetailDoctor,
    getMarkdown,
    updateMarkdown,
};
