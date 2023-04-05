import { useParams } from "react-router-dom";
import Header from "../../../components/common/Header";
import CustomBreadcumb from "../../../components/common/CustomBreadcumb";
import { Avatar } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";
import { docTitle } from "../../../utils/constant";
import DoctorSchedule from "./DoctorSchedule";
import { getAllDoctor } from "../../../api/doctorService";
import DoctorExtraInfo from "./DoctorExtraInfo";

function DetailDoctor() {
    const { id } = useParams();
    const [doctorDetail, setDoctorDetail] = useState(null);
    const crumbs = [
        { name: "Trang chủ", link: "/" },
        { name: "Bác sĩ", link: "/" },
        { name: "Thông tin bác sĩ", link: undefined },
    ];
    useEffect(() => {
        document.title = docTitle.USER.doctor_info;
        getAllDoctor(`get-doctor-detail/${id}`)
            .then((res) => {
                setDoctorDetail(res.data.data);
            })
            .catch((e) => {
                console.error(e);
            });
    }, []);

    return (
        <>
            <Header />
            <section>
                <div className="mb-3 max-w-screen-xl mx-auto">
                    <CustomBreadcumb crumbs={crumbs} />
                </div>
                {doctorDetail ? (
                    <div className="">
                        <div className="mb-3 flex justify-start py-5 max-w-screen-xl mx-auto">
                            <div className="basis-3/12">
                                <Avatar
                                    img={
                                        doctorDetail.image
                                            ? `${
                                                  import.meta.env
                                                      .VITE_BACKEND_URL
                                              }/users/avatar/${
                                                  doctorDetail.image
                                              }`
                                            : null
                                    }
                                    size="xl"
                                    rounded
                                />
                            </div>
                            <div className="basis-9/12">
                                <h1 className="font-semibold text-3xl mb-3">
                                    {`${doctorDetail.positionData.valueVi}, Bác sĩ ${doctorDetail.firstName} ${doctorDetail.lastName}`}
                                </h1>
                                {doctorDetail.markdown &&
                                    doctorDetail.markdown.description && (
                                        <span>
                                            {doctorDetail.markdown.description}
                                        </span>
                                    )}
                                {!doctorDetail.markdown && (
                                    <span className="text-red-600 text-center">
                                        Không tìm thấy chi tiết bác sĩ
                                    </span>
                                )}
                            </div>
                        </div>
                        <hr />
                        <div className="py-8 max-w-screen-xl mx-auto flex divide-x-2">
                            <div className="basis-1/2">
                                <DoctorSchedule doctorId={doctorDetail.id} />
                            </div>
                            <div className="basis-1/2 pl-5">
                                <DoctorExtraInfo doctorId={id} />
                            </div>
                        </div>
                        <hr />
                        <div className="py-10 bg-gray-100">
                            {doctorDetail.markdown &&
                                doctorDetail.markdown.contentHTML && (
                                    <div className="max-w-screen-xl mx-auto">
                                        <article
                                            className="prose"
                                            dangerouslySetInnerHTML={{
                                                __html: doctorDetail.markdown
                                                    .contentHTML,
                                            }}
                                        ></article>
                                    </div>
                                )}
                        </div>
                    </div>
                ) : (
                    <h1 className="text-center text-red-600 text-xl">
                        Không tìm thấy thông tin bác sĩ
                    </h1>
                )}
            </section>
        </>
    );
}

export default DetailDoctor;
