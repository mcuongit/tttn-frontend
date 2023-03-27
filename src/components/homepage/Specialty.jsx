import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../assets/images/specialty/sp1.jpg";
import "./Specialty.css";
import { Card } from "flowbite-react";
import { useTranslation } from "react-i18next";

function Specialty() {
  const { t } = useTranslation();
  const s = [
    "Cơ xương khớp",
    "Thần kinh",
    "Tiêu hoá",
    "Tim mạch",
    "Tai mũi họng",
    "Cột sống",
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
  };
  return (
    <section className="py-10">
      <section className="max-w-screen-xl mx-auto my-3 py-3">
        <h1 className="text-3xl font-semibold mb-3">
          {t("homepage.specialty.title")}
        </h1>
        <Slider {...settings}>
          {s.map((item, index) => (
            <div key={index} className="max-w-sm px-2">
              <Card imgSrc="https://images.unsplash.com/photo-1609188076864-c35269136b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white whitespace-nowrap truncate">
                  {item}
                </h5>
                <div className="font-normal">
                  <div className="mt-4 flex space-x-3 lg:mt-6">
                    <a
                      href="#"
                      className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Xem thông tin
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </Slider>
      </section>
    </section>
  );
}

export default Specialty;
