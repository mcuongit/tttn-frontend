import callApi from "./_configApi";

const homeApi = (endpoint, method = "GET", data) => {
    return callApi("home", endpoint, method, data);
};

export const getTopDoctor = (endpoint) => {
    return homeApi(endpoint);
};
