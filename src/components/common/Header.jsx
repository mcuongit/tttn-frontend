import React from "react";
import logoApp from "../../assets/yinyang.svg";
import { MenuIcon } from "../../utils/HeroIcon";
import { Button } from "flowbite-react";
import { path } from "../../utils/constant";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="bg-white">
            <div className="container max-w-screen-xl mx-auto text-base">
                <div className="flex flex-row items-center py-4 justify-start">
                    <div className="basis-3/12 flex flex-row items-center gap-x-2">
                        <MenuIcon />
                        <Link
                            to={path.HOME}
                            className="flex items-center gap-x-1"
                        >
                            <img
                                className="w-[40px] h-auto"
                                srcSet={logoApp}
                                alt="logo"
                            />
                            <span className="text-3xl font-bold tracking-tight">
                                CuongStore
                            </span>
                        </Link>
                    </div>
                    <nav className="basis-7/12">
                        <ul className="flex flex-row justify-between text-sm items-center">
                            <li>
                                <a href="#">
                                    <div className="font-semibold">
                                        Chuyên khoa
                                    </div>
                                    <small>Tìm bác sĩ theo chuyên khoa</small>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="font-semibold">
                                        Cơ sở y tế
                                    </div>
                                    <small>Chọn bệnh viện phòng khám</small>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="font-semibold">Bác sĩ</div>
                                    <small>Chọn bác sĩ giỏi</small>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="font-semibold">
                                        Gói khám
                                    </div>
                                    <small>Khám sức khoẻ tổng quát</small>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="basis-2/12 flex items-center justify-around">
                        <Button size={"sm"}>Tài khoản</Button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
