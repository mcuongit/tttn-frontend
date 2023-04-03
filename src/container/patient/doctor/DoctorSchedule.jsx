import { Select } from "flowbite-react";
import { useEffect, useState } from "react";

function DoctorSchedule() {
    const [daysList, setDaysList] = useState([]);
    const days = [
        "Chủ nhật",
        "Thứ 2",
        "Thứ 3",
        "Thứ 4",
        "Thứ 5",
        "Thứ 6",
        "Thứ 7",
    ];
    useEffect(() => {
        let a = [];
        const d = new Date();
        const options = { year: "numeric", month: "numeric", day: "numeric" };
        for (let i = 0; i < 3; i++) {
            const nextDay = new Date(d);
            nextDay.setDate(d.getDate() + i);
            const dayName = days[nextDay.getDay()];
            const obj = {
                label: `${dayName} - ${nextDay.toLocaleDateString(
                    "vi-VN",
                    options
                )}`,
                value: null,
            };
            a.push(obj);
        }
        setDaysList(a);
    }, []);

    return (
        <>
            <Select required={true} className="w-full lg:w-1/2">
                {daysList &&
                    daysList.map((item, index) => (
                        <option key={index}>{item.label}</option>
                    ))}
            </Select>
        </>
    );
}

export default DoctorSchedule;
