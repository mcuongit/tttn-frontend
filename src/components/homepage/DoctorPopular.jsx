import { Avatar, Card } from "flowbite-react";
import React from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import doctorImg from "../../assets/images/doctor/bs1.jpg";

function DoctorPopular() {
  const color = [
    "gray",
    "light",
    "purple",
    "success",
    "pink",
    "gray",
    "light",
    "purple",
    "success",
    "pink",
    "gray",
    "light",
    "purple",
    "success",
    "pink",
  ];
  const s = [
    "Bác sĩ 1",
    "Bác sĩ 2",
    "Bác sĩ 3",
    "Bác sĩ 4",
    "Bác sĩ 5",
    "Bác sĩ 6",
    "Bác sĩ 7",
    "Bác sĩ 8",
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
  };

  const { t } = useTranslation();

  return (
    <section className="py-10">
      <section className="max-w-screen-xl mx-auto my-3 py-3">
        <h1 className="text-3xl font-semibold mb-3">
          {t("homepage.doctor.title")}
        </h1>
        <Slider {...settings}>
          {s.map((item, index) => (
            <div key={index}>
              <div className="max-w-sm px-2">
                <Card>
                  <div className="flex flex-col items-center pb-7">
                    <Avatar
                      img="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                      rounded={true}
                      bordered={true}
                      color={color[index]}
                      size="xl"
                    />
                    <h5 className="mt-3 mb-1 text-xl font-medium text-gray-900 dark:text-white">
                      {item}
                    </h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Visual Designer
                    </span>
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
            </div>
          ))}
        </Slider>
      </section>
    </section>
  );
}

export default DoctorPopular;
