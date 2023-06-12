import { useParams } from "react-router-dom";
import CustomBreadcumb from "../../../components/common/CustomBreadcumb";
import { Avatar, Button } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";
import { docTitle } from "../../../utils/constant";
import DoctorSchedule from "./DoctorSchedule";
import { getAllDoctor } from "../../../api/doctorService";
import DoctorExtraInfo from "./DoctorExtraInfo";
import CommentFB from "../socialplugin/CommentFB";
import LikeAndShare from "../socialplugin/LikeAndShare";

function DetailDoctor() {
  const { id } = useParams();
  const [doctorDetail, setDoctorDetail] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
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
      <section className="lg:mt-0 mt-16 lg:px-0 px-2">
        <div className="mb-3 max-w-screen-lg mx-auto">
          <CustomBreadcumb crumbs={crumbs} />
        </div>
        {doctorDetail ? (
          <>
            <div className="mb-3 lg:flex block justify-start py-5 max-w-screen-lg mx-auto">
              <div className="basis-3/12 lg:mb-0 mb-2">
                <Avatar
                  img={
                    doctorDetail.image
                      ? `${import.meta.env.VITE_BACKEND_URL}/users/avatar/${
                          doctorDetail.image
                        }`
                      : null
                  }
                  size="xl"
                  rounded
                />
              </div>
              <div className="basis-9/12">
                <h1 className="font-semibold lg:text-3xl text-2xl lg:text-start text-center mb-3">
                  {`${doctorDetail.positionData.valueVi}, Bác sĩ ${doctorDetail.firstName} ${doctorDetail.lastName}`}
                </h1>
                {doctorDetail.markdown && doctorDetail.markdown.description && (
                  <>
                    <p className="text-justify">
                      {doctorDetail.markdown.description}
                    </p>
                    <hr className="lg:my-5 lg:block hidden" />
                    <div className="lg:block hidden">
                      <LikeAndShare link="https://google.com.vn" />
                    </div>
                  </>
                )}
                {!doctorDetail.markdown && (
                  <span className="text-red-600 text-center">
                    Không tìm thấy chi tiết bác sĩ
                  </span>
                )}
              </div>
            </div>
            <hr className="lg:block hidden" />
            <div className="py-8 max-w-screen-lg mx-auto flex lg:flex-row flex-col lg:divide-x-2">
              <div className="lg:basis-1/2 lg:order-1 order-2">
                <h3 className="text-xl font-bold text-gray-500 mb-3 tracking-tight">
                  Đặt lịch khám với bác sĩ này
                </h3>
                {isClicked ? (
                  <DoctorSchedule doctorId={doctorDetail.id} />
                ) : (
                  <Button onClick={() => setIsClicked(!isClicked)}>
                    Đặt lịch ngay
                  </Button>
                )}
              </div>
              <div className="lg:basis-1/2 lg:pl-5 lg:order-2 order-1 lg:border-0 lg:p-0 p-2 border rounded">
                <DoctorExtraInfo doctorId={id} />
              </div>
            </div>
            <hr />
            <div className="py-10 bg-gray-100">
              {doctorDetail.markdown && doctorDetail.markdown.contentHTML && (
                <div className="max-w-screen-lg mx-auto">
                  <article
                    className="prose"
                    dangerouslySetInnerHTML={{
                      __html: doctorDetail.markdown.contentHTML,
                    }}
                  ></article>
                </div>
              )}
            </div>
          </>
        ) : (
          <h1 className="text-center text-red-600 text-xl">
            Không tìm thấy thông tin bác sĩ
          </h1>
        )}
      </section>
      <CommentFB link="https://google.com" />
    </>
  );
}

export default DetailDoctor;
