import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { findAllClinic } from "../../api/clinicService";
import { Link, useNavigate } from "react-router-dom";
import { IMAGE_LINK, PAGE_TYPE, settings } from "../../utils/constant";
import { ArrowRightIcon } from "../../utils/HeroIcon";
import { Button } from "flowbite-react";

function MedicalFacility() {
  const [lstClinics, setLstClinics] = useState([]);
  useEffect(() => {
    findAllClinic().then((res) => {
      if (res && res.data) {
        setLstClinics(res.data);
      }
    });
  }, []);
  const navi = useNavigate();

  return (
    <section className="py-10 bg-gray-100 md:px-0 px-2">
      <section className="max-w-screen-lg mx-auto my-3 ">
        <div className="flex justify-between items-center mb-5">
          <h1 className="lg:text-3xl text-xl tracking-tight font-bold">
            Cơ sở y tế nổi bật
          </h1>
          <Button
            onClick={() => navi("/listItem?items=" + PAGE_TYPE.clinic)}
            size={"sm"}
            color="gray"
          >
            <span className="mr-1 md:text-base text-xs">Xem thêm</span>{" "}
            <ArrowRightIcon className="md:w-6 md:h-6 w-4 h-4" />
          </Button>
        </div>
        <Slider {...settings}>
          {lstClinics.map((item, index) => (
            <div key={index} className="max-w-sm px-2" title={item.name}>
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow py-3">
                <div className="h-48 flex justify-center items-center">
                  <img
                    className="rounded-t-lg h-full w-auto object-contain"
                    src={`${IMAGE_LINK.clinic}/${item.image}`}
                    alt=""
                  />
                </div>
                <div className="p-5">
                  <Link to={`/clinic/${item.id}`}>
                    <h5 className="mb-2 lg:text-2xl text-xl font-bold tracking-tight text-gray-900 truncate">
                      {item.name}
                    </h5>
                  </Link>
                  <Link
                    to={`/clinic/${item.id}`}
                    className="inline-flex items-center lg:rounded-lg rounded-md bg-blue-700 lg:py-2 lg:px-4 py-2 px-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 mt-5"
                  >
                    Xem thông tin
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </section>
  );
}

export default MedicalFacility;
