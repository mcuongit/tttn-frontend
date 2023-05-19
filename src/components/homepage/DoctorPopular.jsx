import { Avatar, Button, Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getTopDoctor } from "../../api/homeService";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "../../utils/HeroIcon";
import { PAGE_TYPE } from "../../utils/constant";

function DoctorPopular() {
    const color = ["gray", "light", "purple", "success", "pink", "gray"];
    const limit = 10;
    const [doctorsList, setDoctorsList] = useState([]);
    useEffect(() => {
        getTopDoctor(`get-top-doctor/${limit}`)
            .then((res) => {
                setDoctorsList(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
    };
    const navi = useNavigate();

    return (
        <section className="py-10">
            <section className="max-w-screen-xl mx-auto my-3 py-3">
                <div className="flex justify-between items-center mb-5">
                    <h1 className="text-3xl font-semibold">Bác sĩ nổi bật</h1>
                    <Button
                        onClick={() =>
                            navi("/listItem?items=" + PAGE_TYPE.doctor)
                        }
                        size={"sm"}
                        color="gray"
                    >
                        <span className="mr-1">Xem thêm</span>{" "}
                        <ArrowRightIcon />
                    </Button>
                </div>
                <Slider {...settings}>
                    {doctorsList &&
                        doctorsList.length > 0 &&
                        doctorsList.map((item) => (
                            <div key={item.id}>
                                <div className="max-w-sm px-2">
                                    <Card>
                                        <div className="flex flex-col items-center pb-7">
                                            <Avatar
                                                img={
                                                    item.image
                                                        ? `${
                                                              import.meta.env
                                                                  .VITE_BACKEND_URL
                                                          }/users/avatar/${
                                                              item.image
                                                          }`
                                                        : ""
                                                }
                                                rounded={true}
                                                bordered={true}
                                                color={
                                                    color[
                                                        Math.floor(
                                                            Math.random() * 6
                                                        )
                                                    ]
                                                }
                                                size="xl"
                                            />
                                            <h5 className="mt-3 mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                                {item.firstName +
                                                    " " +
                                                    item.lastName}
                                            </h5>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {item.positionData.valueVi}
                                            </span>
                                            <div className="mt-4 flex space-x-3 lg:mt-6">
                                                <Button size="sm">
                                                    <Link
                                                        to={`/doctor/${item.id}`}
                                                    >
                                                        Xem thông tin
                                                    </Link>
                                                </Button>
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
