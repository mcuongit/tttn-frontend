export const path = {
    HOME: "/",
    LOGIN: "/login",
    LOG_OUT: "/logout",
    ADMIN: "/admin",
    DETAIL_DOCTOR: "/doctor/:id",
    DETAIL_SPECIALTY: "specialty/:id",
    VERIFY_EMAIL: "/verify-booking",
};

export const LANGUAGES = {
    VI: "vi",
    EN: "en",
};

export const manageActions = {
    ADD: "ADD",
    EDIT: "EDIT",
    DELETE: "DELETE",
};

export const dateFormat = {
    SEND_TO_SERVER: "DD/MM/YYYY",
};

export const YesNoObj = {
    YES: "Y",
    NO: "N",
};

export const docTitle = {
    ADMIN: {
        dashboard: "Admin | Tổng quan",
        users: "Admin | Quản lý người dùng",
        add_user: "Admin | Thêm người dùng",
        edit_user: "Admin | Sửa người dùng",
        schedule: "Admin | Lịch khám",
        doctor_manage: "Admin | Quản lý bác sĩ",
    },
    USER: {
        home: "Trang chủ",
        doctor_info: "Thông tin bác sĩ",
    },
    NOTFOUND: "Không tìm thấy trang",
};

export const USER_ROLE = {
    ADMIN: "R1",
    DOCTOR: "R2",
    PATIENT: "R3",
};

export const USER_AVATAR_URL = `${
    import.meta.env.VITE_BACKEND_URL
}/users/avatar`;

export const IMAGE_LINK = {
    specialty: `${import.meta.env.VITE_BACKEND_URL}/specialty/image`,
};
