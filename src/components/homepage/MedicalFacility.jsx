import { Card } from "flowbite-react";
import React from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import medicalImg from "../../assets/images/medical/bv1.jpg";

function MedicalFacility() {
  const { t } = useTranslation();
  const s = [
    "Bệnh viện Hữu nghị Việt Đức",
    "Bệnh viện Chợ Rẫy",
    "Bệnh viện Ung bướu Hưng Việt",
    "Hệ thống y tế MEDLATEC",
    "Hệ thống Y tế Thu Cúc TCI",
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
    <section className="py-10 bg-gray-100">
      <section className="max-w-screen-xl mx-auto my-3 ">
        <h1 className="text-3xl font-semibold mb-3">
          {t("homepage.hospital.title")}
        </h1>
        <Slider {...settings}>
          {s.map((item, index) => (
            <div key={index} className="max-w-sm px-2" title={item}>
              <Card imgSrc="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80">
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

export default MedicalFacility;
