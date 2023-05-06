export const getBase64 = (file) => {
    return new Promise((resolve) => {
        let baseURL = "";
        // Make new FileReader
        let reader = new FileReader();
        // Convert the file to base64 text
        reader.readAsDataURL(file);
        // on reader load somthing...
        reader.onload = () => {
            baseURL = reader.result;
            resolve(baseURL);
        };
    });
};

export const dateOnly = (date) => {
    if (date) {
        const _date = new Date(date);
        _date.setHours(0, 0, 0, 0);
        return _date;
    } else {
        const _date = new Date();
        _date.setHours(0, 0, 0, 0);
        return _date;
    }
};
