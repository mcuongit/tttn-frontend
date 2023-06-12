import { Button, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { getScheduleByDate } from "../../../api/scheduleApi";
import BookingModal from "./modal/BookingModal";

function DoctorSchedule(props) {
  const [daysList, setDaysList] = useState([]);
  const [availableTime, setAvailableTime] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [dataSendModal, setDataSendModal] = useState({});
  const [exactDate, setExactDate] = useState();

  useEffect(() => {
    let a = [];
    const d = new Date();
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      weekday: "long",
    };
    for (let i = 0; i < 3; i++) {
      const nextDay = new Date(d);
      nextDay.setDate(d.getDate() + i);
      const obj = {
        label: `${nextDay.toLocaleDateString("vi-VN", options)}`,
        value: nextDay,
      };
      a.push(obj);
    }
    setDaysList(a);
  }, []);

  useEffect(() => {
    if (daysList.length > 0) {
      const { value } = daysList[0];
      fetchTime(value);
    }
  }, [daysList]);

  const handleDayChange = (e) => {
    let dateOnly = new Date(e.target.value);
    dateOnly.setHours(0, 0, 0, 0);
    dateOnly = dateOnly.getTime();
    setExactDate(dateOnly);
    fetchTime(dateOnly);
  };

  const fetchTime = (date) => {
    const { doctorId } = props;
    getScheduleByDate(`get-by-date/${doctorId}/${date}`).then((res) => {
      if (res && res.data && res.data.statusCode === 0) {
        setAvailableTime(res.data.data);
      }
    });
  };

  const handleClickModal = (time) => {
    const _dataSend = {
      ...time,
      exactDate: exactDate,
    };
    setIsShowModal(true);
    setDataSendModal(_dataSend);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <BookingModal
        isShowModal={isShowModal}
        closeModal={closeModal}
        dataSent={dataSendModal}
      />
      <div className="mb-3">
        <Select
          required={true}
          className="w-full lg:w-1/2"
          onChange={(e) => handleDayChange(e)}
          defaultValue={new Date()}
        >
          {daysList &&
            daysList.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
        </Select>
      </div>
      <div className="mb-3 flex gap-x-3 items-center">
        <CalendarIcon />
        <label>Lịch khám</label>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-2 pr-3">
        {availableTime && availableTime.length > 0
          ? availableTime.map((item) => (
              <Button
                key={item.id}
                color="purple"
                onClick={() => handleClickModal(item)}
              >
                {item.timeTypeData.valueVi}
              </Button>
            ))
          : "Không có thông tin"}
      </div>
      <div className="flex mt-5 text-gray-500 text-sm">
        Chọn <PointerIcon /> và đặt (Phí đặt lịch 0đ)
      </div>
    </>
  );
}

const CalendarIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
      <path
        fillRule="evenodd"
        d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const PointerIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default DoctorSchedule;
