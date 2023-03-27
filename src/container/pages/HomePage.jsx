import React from "react";
import Footers from "../../components/common/Footers";
import Header from "../../components/common/Header";
import About from "../../components/homepage/About";
import Banner from "../../components/homepage/Banner";
import DoctorPopular from "../../components/homepage/DoctorPopular";
import HandBook from "../../components/homepage/HandBook";
import MedicalFacility from "../../components/homepage/MedicalFacility";
import Specialty from "../../components/homepage/Specialty";

function HomePage() {
  return (
    <>
      <Header />
      <Banner />
      <Specialty />
      <MedicalFacility />
      <DoctorPopular />
      <HandBook />
      <About />
      <Footers />
    </>
  );
}

export default HomePage;
