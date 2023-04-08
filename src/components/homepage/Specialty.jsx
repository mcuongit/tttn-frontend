import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Specialty.css";
import { Card } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { getAllSpecs } from "../../api/specialtyService";
import { useEffect } from "react";
import { IMAGE_LINK } from "../../utils/constant";
import { Link } from "react-router-dom";

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
    const [specsList, setSpecsList] = useState([]);
    useEffect(() => {
        getAllSpecs().then((res) => {
            if (res && res.data) {
                setSpecsList(res.data);
            }
            console.log(res);
        });
    }, []);

    return (
        <section className="py-10">
            <section className="max-w-screen-xl mx-auto my-3 py-3">
                <h1 className="text-3xl font-semibold mb-3">
                    {t("homepage.specialty.title")}
                </h1>
                <Slider {...settings}>
                    {specsList &&
                        specsList.length > 0 &&
                        specsList.map((item, index) => (
                            <div key={index} className="max-w-sm px-2">
                                <Card
                                    imgSrc={
                                        item.image
                                            ? `${IMAGE_LINK.specialty}/${item.image}`
                                            : "https://images.unsplash.com/photo-1609188076864-c35269136b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                                    }
                                >
                                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white whitespace-nowrap truncate">
                                        {item.name}
                                    </h5>
                                    <div className="font-normal">
                                        <div className="mt-4 flex space-x-3 lg:mt-6">
                                            <Link
                                                href="#"
                                                className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
