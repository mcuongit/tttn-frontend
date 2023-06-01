import { useParams } from "react-router-dom";
import { useState } from "react";
import DoctorSchedule from "../doctor/DoctorSchedule";
import React from "react";
import DoctorExtraInfo from "../doctor/DoctorExtraInfo";
import DoctorProfile from "../doctor/DoctorProfile";
import { useEffect } from "react";
import { findAllByClinic, getBySpecId } from "../../../api/doctorService";
import { getAllCodeType } from "../../../api/allcodeApi";
import { Select } from "flowbite-react";
import { docTitle } from "../../../utils/constant";
import { findOneClinic } from "../../../api/clinicService";

function DetailClinic() {
  const { id } = useParams();
  const [doctorsList, setDoctorsList] = useState([]);
  const [provincesList, setProvincesList] = useState([]);
  const [clinicInfo, setClinicInfo] = useState({});
  useEffect(() => {
    document.title = docTitle.USER.detail_spec;
    findOneClinic(id).then((res) => {
      if (res && res.data) {
        setClinicInfo(res.data);
      }
    });
    fetchData("ALL");
    getAllCodeType("PROVINCE").then((res) => {
      if (res && res.data && res.data.statusCode === 0) {
        setProvincesList(res.data.data);
      }
    });
  }, []);

  const fetchData = () => {
    findAllByClinic(id).then((res) => {
      if (res && res.data) {
        setDoctorsList(res.data);
      }
    });
  };

  const handleChangeProvince = (e) => {
    fetchData(e.target.value);
  };

  return (
    <>
      <div className="my-3 min-h-[300px]">
        <div className="max-w-screen-lg mx-auto py-5">
          {clinicInfo ? (
            <article
              className="prose"
              dangerouslySetInnerHTML={{
                __html: clinicInfo.descriptionHTML,
              }}
            ></article>
          ) : (
            <p>Không tìm thấy thông tin</p>
          )}
        </div>
      </div>
      <div className="bg-gray-100 py-3">
        <div className="max-w-screen-lg mx-auto">
          <Select
            className="w-full md:w-1/2 lg:w-1/4"
            name="provinceId"
            onChange={(e) => handleChangeProvince(e)}
          >
            <option value="ALL">Toàn quốc</option>
            {provincesList &&
              provincesList.length > 0 &&
              provincesList.map((item) => {
                return (
                  <option key={item.id} value={item.key}>
                    {item.valueVi}
                  </option>
                );
              })}
          </Select>
        </div>
        {doctorsList && doctorsList.length > 0 ? (
          doctorsList.map((item, index) => {
            return (
              <div
                className="max-w-screen-lg mx-auto rounded-md shadow-lg my-5 py-8 flex bg-white"
                key={index}
              >
                <div className="basis-1/2 border-r px-3">
                  <DoctorProfile doctorId={item.doctorId} showDesc showLink />
                </div>
                <div className="basis-1/2 px-3">
                  <DoctorSchedule doctorId={item.doctorId} />
                  <hr className="my-3" />
                  <DoctorExtraInfo doctorId={item.doctorId} />
                </div>
              </div>
            );
          })
        ) : (
          <div className="max-w-screen-lg mx-auto py-5">
            <p>Không tìm thấy thông tin</p>
          </div>
        )}
      </div>
    </>
  );
}

export default DetailClinic;
