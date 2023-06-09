import React, { useEffect } from "react";
import About from "../../components/homepage/About";
import Banner from "../../components/homepage/Banner";
import DoctorPopular from "../../components/homepage/DoctorPopular";
import HandBook from "../../components/homepage/HandBook";
import MedicalFacility from "../../components/homepage/MedicalFacility";
import Specialty from "../../components/homepage/Specialty";
import { docTitle } from "../../utils/constant";
import { Button } from "flowbite-react";
import { IconChevronsRight, IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  useEffect(() => {
    const { home } = docTitle.USER;
    document.title = home;
  }, []);
  const navi = useNavigate();
  return (
    <>
      <Banner />
      <section className="bg-gray-100">
        <div className="max-w-screen-lg mx-auto py-10">
          <div className="border rounded py-3 px-5 bg-white shadow">
            <h1 className="text-3xl tracking-tight font-bold mb-3">
              Dễ dàng tra cứu lịch khám qua email
            </h1>
            <div className="flex justify-center items-center">
              <div className="basis-1/3">
                <img
                  src="/images/tracking.png"
                  className="w-full h-auto"
                  alt="tracking"
                />
              </div>
              <div className="basis-2/3 pr-5">
                <p className="text-gray-900 text-right tracking-tight text-2xl drop-shadow-lg">
                  Dễ dàng kiểm tra trạng thái đặt lịch khám, lịch sử đặt lịch
                  khám chỉ với 1 click
                </p>
                <div className="flex justify-end mt-3">
                  <Button className="group" onClick={() => navi("/tracking")}>
                    <IconSearch className="mr-0 group-hover:mr-3 transition-all duration-300" />
                    <span>Tra cứu ngay</span>
                    <IconChevronsRight className="ml-0 group-hover:ml-3 transition-all duration-300" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <Specialty />
      <MedicalFacility />
      <DoctorPopular />
      <HandBook />
      <About />
    </>
  );
}

export default HomePage;
