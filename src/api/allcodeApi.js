import callApi from "./_configApi";

const allCodeApi = (endpoint, method = "GET", data) => {
    return callApi("allcode", endpoint, method, data);
};

export const getAllCodeType = (endpoint) => {
    return allCodeApi(endpoint);
};
