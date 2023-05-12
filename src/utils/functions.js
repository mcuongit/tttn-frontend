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

//get date only

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

//format date yyyy-mm-dd

export const formatDateYmd = (date) => {
    let d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
};

//format date dd-mm-yyyy

function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
}

export function formatDate(date) {
    date = new Date(date);
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join("-");
}

export const resetHour = (date) => {
    const _date = new Date(date);
    _date.setHours(0, 0, 0, 0);
    return _date;
};

export const getCurrentDate = (date = null) => {
    if (!date) {
        return resetHour(new Date());
    } else {
        return resetHour(date);
    }
};

export const LETTER = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "R",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];
