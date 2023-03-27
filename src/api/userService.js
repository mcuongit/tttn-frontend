import axios from "axios";

const API_URL = "http://localhost:5000/users";

const callApi = (endpoint, method = "GET", data) => {
    return axios({
        method: method,
        url: `${API_URL}/${endpoint}`,
        data: data,
    }).catch((e) => {
        console.log(e);
    });
};

const handleLoginApi = (email, password) => {
    return axios.post("login", { email: email, password: password });
};

const getAllUsers = (endpoint) => {
    return callApi(endpoint);
};

const getOneUser = (endpoint) => {
    return callApi(endpoint);
};

const addNewUser = (endpoint, data) => {
    return callApi(endpoint, "POST", data);
};

const deleteUser = (endpoint) => {
    return callApi(endpoint, "DELETE");
};

const updateUserService = (endpoint, data) => {
    return callApi(endpoint, "PATCH", data);
};

const updateUserImgService = (endpoint, data) => {
    return callApi(endpoint, "PUT", data);
};

const uploadImg = (endpoint, data) => {
    return callApi(endpoint, "POST", data);
};

const getAllcodeService = (data) => {
    return axios.get(`http://localhost:5000/allcode/${data}`);
};

export {
    handleLoginApi,
    getAllUsers,
    addNewUser,
    deleteUser,
    updateUserService,
    getAllcodeService,
    uploadImg,
    updateUserImgService,
    getOneUser,
};
