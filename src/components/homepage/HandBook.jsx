import { Card } from "flowbite-react";
import React from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";

function HandBook() {
  const { t } = useTranslation();
  const s = [1, 2, 3, 4, 5, 6, 7, 8];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <section className="py-10 bg-gray-100">
      <section className="max-w-screen-xl mx-auto my-3 ">
        <h1 className="text-3xl font-semibold mb-3">
          {t("homepage.manual.title")}
        </h1>
        <Slider {...settings}>
          {s.map((item, index) => (
            <div key={index} className="max-w-md px-2">
              <Card
                horizontal={true}
                imgSrc="https://flowbite.com/docs/images/blog/image-4.jpg"
              >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
              </Card>
            </div>
          ))}
        </Slider>
      </section>
    </section>
  );
}

export default HandBook;
