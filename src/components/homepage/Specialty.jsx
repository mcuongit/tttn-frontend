import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Card } from "flowbite-react";
import { useState } from "react";
import { getAllSpecs } from "../../api/specialtyService";
import { useEffect } from "react";
import { IMAGE_LINK, PAGE_TYPE, settings } from "../../utils/constant";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "../../utils/HeroIcon";

function Specialty() {
  const navi = useNavigate();
  const [specsList, setSpecsList] = useState([]);
  useEffect(() => {
    getAllSpecs().then((res) => {
      if (res && res.data) {
        setSpecsList(res.data);
      }
    });
  }, []);

  return (
    <section className="py-10 md:px-0 px-2">
      <section className="max-w-screen-lg mx-auto">
        <div className="flex justify-between items-center mb-5">
          <h1 className="lg:text-3xl text-xl tracking-tight font-bold">
            Chuyên khoa phổ biến
          </h1>
          <Button
            onClick={() => navi("/listItem?items=" + PAGE_TYPE.specialty)}
            size={"sm"}
            color="gray"
          >
            <span className="mr-1 md:text-base text-xs">Xem thêm</span>{" "}
            <ArrowRightIcon className="md:w-6 md:h-6 w-4 h-4" />
          </Button>
        </div>

        <Slider {...settings}>
          {specsList &&
            specsList.length > 0 &&
            specsList.map((item, index) => (
              <div key={index} className="md:max-w-sm px-2">
                <Card
                  imgSrc={
                    item.image
                      ? `${IMAGE_LINK.specialty}/${item.image}`
                      : "https://images.unsplash.com/photo-1609188076864-c35269136b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  }
                >
                  <h5 className="lg:text-2xl text-xl font-bold tracking-tight text-gray-900 truncate">
                    {item.name}
                  </h5>
                  <div className="font-normal">
                    <div className="mt-4 flex space-x-3 lg:mt-6">
                      <Link
                        to={`specialty/${item.id}`}
                        className="inline-flex items-center lg:rounded-lg rounded-md bg-blue-700 lg:py-2 lg:px-4 py-2 px-2 text-center md:text-sm text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                      >
                        Xem thông tin
                      </Link>
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
