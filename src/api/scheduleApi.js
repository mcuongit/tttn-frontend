import callApi from "./_configApi";

const allCodeApi = (endpoint, method = "GET", data) => {
    return callApi("schedule", endpoint, method, data);
};

export const saveSchedule = (data) => {
    return allCodeApi("", "POST", data);
};
