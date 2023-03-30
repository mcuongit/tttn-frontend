import React, { useEffect } from "react";
import Footers from "../../components/common/Footers";
import Header from "../../components/common/Header";
import About from "../../components/homepage/About";
import Banner from "../../components/homepage/Banner";
import DoctorPopular from "../../components/homepage/DoctorPopular";
import HandBook from "../../components/homepage/HandBook";
import MedicalFacility from "../../components/homepage/MedicalFacility";
import Specialty from "../../components/homepage/Specialty";
import { docTitle } from "../../utils/constant";

function HomePage() {
    useEffect(() => {
        const { home } = docTitle.USER;
        document.title = home;
    }, []);
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
