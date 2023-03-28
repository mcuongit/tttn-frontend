import callApi from "./_configApi";

const loginApi = (endpoint, method = "GET", data) => {
    return callApi("login", endpoint, method, data);
};

export const handleLoginService = (endpoint = "", data) => {
    return loginApi(endpoint, "POST", data);
};
