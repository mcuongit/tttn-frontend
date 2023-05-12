import React from "react";
import logoApp from "../../assets/yinyang.svg";
import { MenuIcon } from "../../utils/HeroIcon";
import { Button } from "flowbite-react";
import { PAGE_TYPE, path } from "../../utils/constant";
import { Link } from "react-router-dom";

function Header() {
    const menu = [
        {
            name: "Chuyên khoa",
            desc: "Tìm bác sĩ theo chuyên khoa",
            link: `/listItem?items=${PAGE_TYPE.specialty}`,
        },
        {
            name: "Cơ sở y tế",
            desc: "Chọn bệnh viện phòng khám",
            link: `/listItem?items=${PAGE_TYPE.clinic}`,
        },
        {
            name: "Bác sĩ",
            desc: "Chọn bác sĩ giỏi",
            link: `/listItem?items=${PAGE_TYPE.doctor}`,
        },
        {
            name: "Giới thiệu",
            desc: "Tổng quan website",
            link: `/listItem?items=${PAGE_TYPE.doctor}`,
        },
    ];
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
                        <ul className="flex flex-row justify-around text-sm items-center">
                            {menu.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <Link to={item.link}>
                                            <div className="font-semibold">
                                                {item.name}
                                            </div>
                                            <small>{item.desc}</small>
                                        </Link>
                                    </li>
                                );
                            })}
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
