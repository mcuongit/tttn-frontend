import { useTranslation } from "react-i18next";
import {
    BookIcon,
    ChuyenKhoaIcon,
    GoiPhauThuatIcon,
    NhaKhoaIcon,
    PhoneIcon,
    SKDNIcon,
    TinhThanIcon,
    XetNghiemIcon,
    YTeIcon,
} from "../../utils/HeroIcon";

function Banner() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col justify-between max-w-screen-2xl mx-auto text-base bg-[url(assets/images/banner/header-bg.jpg)] bg-center bg-no-repeat bg-cover min-h-[600px]">
            <div className="banner-top py-16 bg-gradient-to-b from-[rgba(0,0,0,0.3)] to-transparent">
                <div className="text-center font-semibold text-3xl text-yellow-400">
                    <h1>{t("homepage.banner.title1")}</h1>
                    <h1>{t("homepage.banner.title2")}</h1>
                </div>
                <div className="flex justify-center items-center py-3 mt-4">
                    <input
                        className="bg-yellow-400 py-3 px-8 rounded-full placeholder:text-sm placeholder:text-black outline-none md:w-[400px]"
                        type="search"
                        placeholder="Tìm bác sĩ"
                    />
                </div>
            </div>
            <div className="banner-bottom">
                <div className="py-6 bg-gradient-to-t from-white to-transparent">
                    <ul className="grid grid-cols-9 justify-center items-start font-semibold text-center">
                        <li className="flex flex-col justify-center items-center">
                            <div className="ct-banner-icon">
                                <ChuyenKhoaIcon />
                            </div>
                            <span className="hover:text-sky-600 cursor-pointer">
                                {t("homepage.banner.opt1")}
                            </span>
                        </li>
                        <li className="flex flex-col justify-center items-center">
                            <div className="ct-banner-icon">
                                <PhoneIcon />
                            </div>
                            <span className="hover:text-sky-600 cursor-pointer">
                                {t("homepage.banner.opt2")}
                            </span>
                        </li>
                        <li className="flex flex-col justify-center items-center">
                            <div className="ct-banner-icon">
                                <BookIcon />
                            </div>
                            <span className="hover:text-sky-600 cursor-pointer">
                                {t("homepage.banner.opt3")}
                            </span>
                        </li>
                        <li className="flex flex-col justify-center items-center">
                            <div className="ct-banner-icon">
                                <XetNghiemIcon />
                            </div>
                            <span className="hover:text-sky-600 cursor-pointer">
                                {t("homepage.banner.opt4")}
                            </span>
                        </li>
                        <li className="flex flex-col justify-center items-center">
                            <div className="ct-banner-icon">
                                <TinhThanIcon />
                            </div>
                            <span className="hover:text-sky-600 cursor-pointer">
                                {t("homepage.banner.opt5")}
                            </span>
                        </li>
                        <li className="flex flex-col justify-center items-center">
                            <div className="ct-banner-icon">
                                <NhaKhoaIcon />
                            </div>
                            <span className="hover:text-sky-600 cursor-pointer">
                                {t("homepage.banner.opt6")}
                            </span>
                        </li>
                        <li className="flex flex-col justify-center items-center">
                            <div className="ct-banner-icon">
                                <GoiPhauThuatIcon />
                            </div>
                            <span className="hover:text-sky-600 cursor-pointer">
                                {t("homepage.banner.opt7")}
                            </span>
                        </li>
                        <li className="flex flex-col justify-center items-center">
                            <div className="ct-banner-icon">
                                <YTeIcon />
                            </div>
                            <span className="hover:text-sky-600 cursor-pointer">
                                {t("homepage.banner.opt8")}
                            </span>
                        </li>
                        <li className="flex flex-col justify-center items-center">
                            <div className="ct-banner-icon">
                                <SKDNIcon />
                            </div>
                            <span className="hover:text-sky-600 cursor-pointer">
                                {t("homepage.banner.opt9")}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Banner;
