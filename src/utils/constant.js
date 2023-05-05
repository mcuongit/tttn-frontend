export const path = {
    HOME: "/",
    LOGIN: "/login",
    LOG_OUT: "/logout",
    ADMIN: "/admin",
    DETAIL_DOCTOR: "/doctor/:id",
    DETAIL_SPECIALTY: "specialty/:id",
    DETAIL_CLINIC: "clinic/:id",
    VERIFY_EMAIL: "/verify-booking",
};

export const docTitle = {
    ADMIN: {
        dashboard: "Admin | Tổng quan",
        users: "Admin | Quản lý người dùng",
        add_user: "Admin | Thêm người dùng",
        edit_user: "Admin | Sửa người dùng",
        schedule: "Admin | Lịch khám",
        doctor_manage: "Admin | Quản lý bác sĩ",
        spec_manage: "Admin | Quản lý Chuyên khoa",
        add_spec: "Admin | Thêm chuyên khoa",
        add_clinic: "Admin | Thêm phòng khám",
        edit_clinic: "Admin | Sửa phòng khám",
        clinic_manage: "Admin | Quản lý phòng khám",
    },
    USER: {
        home: "Trang chủ",
        doctor_info: "Thông tin bác sĩ",
        detail_spec: "Thông tin chuyên khoa",
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
    clinic: `${import.meta.env.VITE_BACKEND_URL}/clinic/image`,
};

export const PAGE_TYPE = {
    specialty: "specialty",
    clinic: "clinic",
    doctor: "doctor",
};
