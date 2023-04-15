import { useEffect, useState } from "react";
import { getDoctorProfile } from "../../../api/doctorService";
import { Avatar } from "flowbite-react";
import { USER_AVATAR_URL } from "../../../utils/constant";

function DoctorProfile(props) {
    const [dataProfile, setDataProfile] = useState({});
    const [doctorImage, setDoctorImage] = useState(null);
    const { doctorId, showDesc } = props;
    useEffect(() => {
        if (doctorId !== -1) {
            getDoctorProfile(`get-doctor-profile/${doctorId}`).then((res) => {
                if (res && res.data && res.data.data) {
                    setDataProfile(res.data.data);
                }
            });
        }
    }, [doctorId]);
    useEffect(() => {
        if (dataProfile && dataProfile.image) {
            setDoctorImage(dataProfile.image);
        }
    }, [dataProfile]);

    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
    });

    return (
        <>
            {dataProfile && (
                <>
                    <div className="flex items-center p-2">
                        <div className="basis-1/4">
                            <Avatar
                                img={
                                    dataProfile.image
                                        ? `${USER_AVATAR_URL}/${dataProfile.image}`
                                        : null
                                }
                                size="lg"
                                rounded
                            />
                        </div>
                        <div className="basis-3/4">
                            <div className="font-semibold text-lg text-blue-600">
                                <span>
                                    {dataProfile.positionData
                                        ? dataProfile.positionData.valueVi
                                        : ""}
                                </span>
                                <span>{` ${dataProfile.firstName} ${dataProfile.lastName}`}</span>
                            </div>
                            {showDesc === true && (
                                <div className="text-gray-500">
                                    {dataProfile.markdown
                                        ? dataProfile.markdown.description
                                        : ""}
                                </div>
                            )}
                        </div>
                    </div>
                    {dataProfile.doctorInfoData && (
                        <div className="mt-3 font-semibold">
                            <span>Giá khám: </span>
                            {dataProfile.doctorInfoData.priceData
                                ? formatter.format(
                                      Number(
                                          dataProfile.doctorInfoData.priceData
                                              .valueVi
                                      )
                                  )
                                : " Không có thông tin"}
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default DoctorProfile;
