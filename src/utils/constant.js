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
    schedule: "Admin | Xem lịch khám",
    schedule_mng: "Admin | Xem lịch khám",
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
  post: `${import.meta.env.VITE_BACKEND_URL}/post/image`,
};

export const PAGE_TYPE = {
  specialty: "specialty",
  clinic: "clinic",
  doctor: "doctor",
  post: "post",
  category: "post/category",
};

// react slick slider

export const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        arrows: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
};
