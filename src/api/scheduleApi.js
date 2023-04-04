import callApi from "./_configApi";

const scheduleApi = (endpoint, method = "GET", data) => {
    return callApi("schedule", endpoint, method, data);
};

export const saveSchedule = (data) => {
    return scheduleApi("", "POST", data);
};

export const getScheduleByDate = (endpoint) => {
    return scheduleApi(endpoint, "GET");
};
