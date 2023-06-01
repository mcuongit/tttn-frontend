import { Button, Label, Table, Toast } from "flowbite-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import DatePicker from "tailwind-datepicker-react";
import { findPatientBooking } from "../../api/bookingService";
import RemedyModal from "./RemedyModal";

function PatientBooking() {
  const ops = {
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1900-01-01"),
    datepickerClassNames: "top-12",
    language: "vi",
  };
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const [dateTime, setDateTime] = useState(date.getTime());
  const [lstPatient, setLstPatient] = useState([]);
  const doctor = useSelector((state) => state.userAdmin.userData);
  useEffect(() => {
    findPatientBooking(doctor.id, dateTime).then((res) => {
      setLstPatient(res.data);
    });
  }, []);

  const handleChange = (time) => {
    const t = time.getTime();
    findPatientBooking(doctor.id, t).then((res) => {
      setLstPatient(res.data);
    });
  };
  const handleConfirm = (item) => {
    const { doctorId, patientId, timeType, id } = item;
    const _data = {
      doctorId,
      patientId,
      email: item.patientData.email,
      timeType,
      id,
      fullName: item.patientData.fullName,
    };
    setDataModal(_data);
    handleModal();
  };
  const handleModal = () => {
    setShowModal(!showModal);
  };
  const filterData = (id) => {
    setLstPatient(lstPatient.filter((item) => item.id !== id));
    setIsSuccess(true);
  };
  return (
    <div className="max-w-screen-lg mx-auto relative">
      <RemedyModal
        handleModal={handleModal}
        showModal={showModal}
        dataModal={dataModal}
        filterData={filterData}
      />
      <h1 className="text-2xl uppercase font-bold mb-3">
        Quản lý bệnh nhân khám bệnh
      </h1>
      <div className="relative max-w-lg mb-3">
        <div className="mb-2 block">
          <Label value="Ngày khám" />
        </div>
        <DatePicker
          options={ops}
          onChange={handleChange}
          show={show}
          setShow={() => setShow(!show)}
        />
      </div>
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>STT</Table.HeadCell>
          <Table.HeadCell>Thời gian</Table.HeadCell>
          <Table.HeadCell>Họ và tên</Table.HeadCell>
          <Table.HeadCell>Địa chỉ</Table.HeadCell>
          <Table.HeadCell>Giới tính</Table.HeadCell>
          <Table.HeadCell>Hành động</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {lstPatient && lstPatient.length > 0 ? (
            lstPatient.map((item, index) => {
              return (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{item.allcodeData.valueVi}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.patientData.fullName}
                  </Table.Cell>
                  <Table.Cell>{item.patientData.address}</Table.Cell>
                  <Table.Cell>{item.patientData.gender}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color={"success"}
                      size={"xs"}
                      onClick={() => handleConfirm(item)}
                    >
                      Xác nhận
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })
          ) : (
            <Table.Row>
              <Table.Cell colSpan={6} className="text-center">
                Không có thông tin
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      {isSuccess && (
        <div className="fixed bottom-10 right-10 max-w-xl">
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal pr-10">Thành công</div>
            <button
              onClick={() => setIsSuccess(false)}
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <span className="sr-only">Close</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </Toast>
        </div>
      )}
    </div>
  );
}
const HiCheck = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={props.className}
    >
      <path
        fillRule="evenodd"
        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
        clipRule="evenodd"
      />
    </svg>
  );
};
export default PatientBooking;
