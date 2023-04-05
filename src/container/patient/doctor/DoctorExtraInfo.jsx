import { useEffect, useState } from "react";
import { getMoreDoctorInfo } from "../../../api/doctorService";

function DoctorExtraInfo(props) {
    const [doctorExtraInfo, setDoctorExtraInfo] = useState({});
    const [vnd, setVnd] = useState(null);
    useEffect(() => {
        const { doctorId } = props;
        getMoreDoctorInfo(`get-by-id/${doctorId}`).then((res) => {
            if (res && res.data && res.data.data) {
                setDoctorExtraInfo(res.data.data);
            }
        });
    }, []);

    useEffect(() => {
        if (doctorExtraInfo.paymentData) {
            const formatter = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
                minimumFractionDigits: 0,
            });
            const { valueVi } = doctorExtraInfo.priceData;
            setVnd(formatter.format(Number(valueVi)));
        }
    }, [doctorExtraInfo]);

    return (
        <>
            {doctorExtraInfo ? (
                <>
                    <div className="flex flex-col">
                        <h5 className="font-semibold text-gray-400 text-base mb-1">
                            ĐỊA CHỈ KHÁM
                        </h5>
                        <span className="font-semibold mb-1">
                            {doctorExtraInfo.nameClinic}
                        </span>
                        <span className="mb-3">
                            {doctorExtraInfo.addressClinic}
                        </span>
                    </div>
                    {doctorExtraInfo.paymentData &&
                    doctorExtraInfo.priceData ? (
                        <>
                            <hr />
                            <div className="py-3">
                                <h5 className="font-semibold text-gray-400 text-base mb-1">
                                    <span>GIÁ KHÁM: </span>
                                    <span className="text-blue-600 text-base">
                                        {vnd ? vnd : "liên hệ"}
                                    </span>
                                </h5>
                                <details>
                                    <summary className="cursor-pointer select-none mb-2">
                                        Xem chi tiết
                                    </summary>
                                    <div className="border rounded-md p-3 bg-gray-100">
                                        <p className="text-gray-500 pb-2">
                                            {doctorExtraInfo.note}
                                        </p>
                                        <hr />
                                        <p className="text-gray-500 pt-2">
                                            Người bệnh có thể thanh toán chi phí
                                            bằng hình thức{" "}
                                            <span className="text-indigo-500">
                                                {
                                                    doctorExtraInfo.paymentData
                                                        .valueVi
                                                }
                                            </span>
                                        </p>
                                    </div>
                                </details>
                            </div>
                        </>
                    ) : (
                        <span className="text-red-600">
                            Không tìm thấy thông tin
                        </span>
                    )}
                </>
            ) : (
                <span>Không có thông tin</span>
            )}
        </>
    );
}

export default DoctorExtraInfo;
