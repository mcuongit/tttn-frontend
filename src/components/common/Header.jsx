import React from "react";
import { MenuIcon } from "../../utils/HeroIcon";
import { PAGE_TYPE, path } from "../../utils/constant";
import { Link } from "react-router-dom";
import { IconHelp, IconX } from "@tabler/icons-react";
import { useState } from "react";

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
  const [classList, setClassList] = useState({
    backdrop: "hidden",
    sidebar: "-translate-x-80",
  });
  const handleSidebar = () => {
    setClassList({
      backdrop: "block",
      sidebar: "translate-x-0",
    });
  };
  const handleClose = () => {
    setClassList({ backdrop: "hidden", sidebar: "-translate-x-80" });
  };
  const megaMenu = [
    ...menu,
    { name: "Cẩm nang", link: "/post" },
    { name: "Danh mục cẩm nang", link: "/post/category" },
    { name: "Liên hệ chúng tôi", link: "/contact" },
  ];
  return (
    <>
      <div>
        <div
          className={`z-50 fixed left-0 top-0 bottom-0 py-3 px-5 bg-[rgba(255,255,255,0.8)] backdrop-blur w-80 ${classList.sidebar} transition-all duration-500`}
        >
          <div className="flex justify-between items-center py-3">
            <Link to={path.HOME} onClick={handleClose}>
              <img
                src="/logo.png"
                alt="logo"
                className="w-40 pointer-events-none"
              />
            </Link>
            <button onClick={handleClose}>
              <IconX />
            </button>
          </div>
          <ul>
            {megaMenu.map((item, index) => {
              return (
                <li
                  key={index}
                  className="py-3 text-lg transition-all duration-300 hover:translate-x-2"
                >
                  <Link
                    className="font-medium tracking-tight text-gray-900 hover:text-blue-600 transition-all duration-300"
                    onClick={handleClose}
                    to={item.link}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className={`bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 right-0 bottom-0 z-[49] ${classList.backdrop}`}
          onClick={handleClose}
        ></div>
      </div>
      <header className="bg-[rgba(255,255,255,0.8)] backdrop-blur fixed top-0 left-0 ring-0 w-screen z-40">
        <div className="container max-w-screen-lg mx-auto text-base">
          <div className="flex flex-row items-center justify-start px-2">
            <div className="lg:basis-3/12 flex flex-row basis-2/3 items-center gap-x-2">
              <button onClick={handleSidebar} className="lg:hidden block">
                <MenuIcon />
              </button>
              <Link to={path.HOME}>
                <img
                  src="/logo.png"
                  alt="logo"
                  className="w-40 pointer-events-none"
                />
              </Link>
            </div>
            <nav className="lg:basis-7/12 lg:block hidden">
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
            <div className="lg:basis-2/12 basis-1/3 flex items-center justify-around">
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
    </>
  );
}

export default Header;
