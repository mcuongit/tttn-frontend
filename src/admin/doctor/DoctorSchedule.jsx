import { useEffect, useState } from "react";
import { docTitle } from "../../utils/constant";
import { Alert, Button, Label, Select } from "flowbite-react";
import DatePicker from "tailwind-datepicker-react";
import { getAllCodeType } from "../../api/allcodeApi";
import { saveSchedule } from "../../api/scheduleApi";
import { getAllDoctor } from "../../api/doctorService";

function DoctorSchedule() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currentDate = `${year}-${month}-${day}`;
    const [doctorsList, setDoctorsList] = useState([]);
    const [rangeTime, setRangeTime] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [saved, setSaved] = useState(false);
    useEffect(() => {
        document.title = docTitle.ADMIN.schedule;
        getAllDoctor("get-all")
            .then((res) => {
                setDoctorsList(res.data.data);
            })
            .catch((e) => {
                console.log(e);
            });
        getAllCodeType("TIME").then((res) => {
            if (res && res.data) {
                const { data } = res.data;
                let clone = [];
                data.forEach((element) => {
                    let item = { ...element, checked: false };
                    clone.push(item);
                });
                setRangeTime(clone);
            }
        });
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        setSelectedDate(d);
    }, []);
    const options = {
        autoHide: true,
        todayBtn: false,
        clearBtn: true,
        maxDate: new Date("2030-01-01"),
        minDate: new Date(currentDate),
        datepickerClassNames: "top-12",
        language: "vi",
    };
    const [show, setShow] = useState(false);
    const handleChange = (selectedDate) => {
        setSelectedDate(selectedDate);
    };
    const handleClose = (state) => {
        setShow(state);
    };
    const handleChangeDoctor = (e) => {
        const { value } = e.target;
        setSelectedDoctor(value);
    };
    const handleSubmit = () => {
        if (!selectedDoctor) {
            alert("Chưa chọn bác sĩ");
            return;
        }
        if (!selectedDate) {
            alert("Lịch biểu không được để trống");
            return;
        }
        const checkedTime = rangeTime.filter((i) => i.checked === true);
        if (checkedTime.length <= 0) {
            alert("Chưa chọn thời gian nào");
            return;
        }
        let result = [];
        checkedTime.forEach((element) => {
            const obj = {
                doctorId: selectedDoctor,
                date: selectedDate,
                timeType: element.key,
            };
            result.push(obj);
        });
        saveSchedule(result).then((res) => {
            if (res && res.data && res.data.statusCode === 0) setSaved(true);
        });
    };
    const handleClickTime = (item) => {
        const x = rangeTime.map((element) => {
            if (element.id === item.id) {
                element.checked = !element.checked;
            }
            return element;
        });
        setRangeTime(x);
    };
    return (
        <div className="min-h-[500px]">
            <div className="flex justify-between items-center mb-5">
                <h1 className="uppercase font-semibold text-2xl">
                    Quản lý kế hoạch khám bệnh
                </h1>
                <Button onClick={handleSubmit}>Lưu thông tin</Button>
            </div>
            {saved && (
                <div className="mb-3">
                    <Alert color="success" onDismiss={() => setSaved(false)}>
                        Lưu thành công
                    </Alert>
                </div>
            )}
            <div className="flex gap-x-5 mb-5">
                <div className="basis-1/2">
                    <div className="mb-2 block">
                        <Label htmlFor="dr" value="Chọn bác sĩ" />
                    </div>
                    <Select
                        id="dr"
                        required={true}
                        onChange={(e) => handleChangeDoctor(e)}
                    >
                        <option value="">Chọn bác sĩ ... </option>
                        {doctorsList &&
                            doctorsList.map((item) => {
                                return (
                                    <option key={item.id} value={item.id}>
                                        {`${item.firstName} ${item.lastName}`}
                                    </option>
                                );
                            })}
                    </Select>
                </div>
                <div className="basis-1/2">
                    <div className="mb-2 block">
                        <Label value="Chọn ngày" />
                    </div>
                    <div className="relative">
                        <DatePicker
                            options={options}
                            onChange={handleChange}
                            show={show}
                            setShow={handleClose}
                        />
                    </div>
                </div>
            </div>
            <div className="flex gap-x-3 justify-between items-center flex-wrap px-3 py-5 border rounded-lg">
                {rangeTime &&
                    rangeTime.map((item) => {
                        return (
                            <Button
                                color={item.checked ? "purple" : "gray"}
                                key={item.id}
                                onClick={() => handleClickTime(item)}
                            >
                                {item.valueVi}
                            </Button>
                        );
                    })}
            </div>
        </div>
    );
}

export default DoctorSchedule;
