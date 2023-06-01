import React from "react";
import { MenuIcon } from "../../utils/HeroIcon";
import { PAGE_TYPE, path } from "../../utils/constant";
import { Link } from "react-router-dom";
import { IconHelp } from "@tabler/icons-react";

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
      link: `/about`,
    },
  ];
  return (
    <header className="bg-white">
      <div className="container max-w-screen-lg mx-auto text-base">
        <div className="flex flex-row items-center py-4 justify-start">
          <div className="basis-3/12 flex flex-row items-center gap-x-2">
            <MenuIcon />
            <Link to={path.HOME}>
              <img
                src="/logo.png"
                alt="logo"
                className="w-44 pointer-events-none"
              />
            </Link>
          </div>
          <nav className="basis-7/12">
            <ul className="flex flex-row justify-around text-sm items-center">
              {menu.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={item.link}>
                      <div className="font-semibold">{item.name}</div>
                      <small>{item.desc}</small>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="basis-2/12 flex items-center justify-around">
            <div className="flex flex-col items-end text-gray-500 font-semibold">
              <a href="/" className="flex items-center">
                <IconHelp />
                <span className="text-xs">Hỗ trợ</span>
              </a>
              <a className="text-xs" href="tel:0865957964">
                0865957964
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
