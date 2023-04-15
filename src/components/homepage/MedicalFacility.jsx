import { Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import medicalImg from "../../assets/images/medical/bv1.jpg";
import { findAllClinic } from "../../api/clinicService";
import { Link } from "react-router-dom";
import { IMAGE_LINK } from "../../utils/constant";

function MedicalFacility() {
    const { t } = useTranslation();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
    };
    const [lstClinics, setLstClinics] = useState([]);
    useEffect(() => {
        findAllClinic().then((res) => {
            if (res && res.data) {
                setLstClinics(res.data);
            }
        });
    }, []);

    return (
        <section className="py-10 bg-gray-100">
            <section className="max-w-screen-xl mx-auto my-3 ">
                <h1 className="text-3xl font-semibold mb-3">
                    {t("homepage.hospital.title")}
                </h1>
                <Slider {...settings}>
                    {lstClinics.map((item, index) => (
                        <div
                            key={index}
                            className="max-w-sm px-2"
                            title={item.name}
                        >
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
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 whitespace-nowrap truncate">
                                            {item.name}
                                        </h5>
                                    </Link>
                                    <Link
                                        to={`/clinic/${item.id}`}
                                        className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 mt-5"
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
