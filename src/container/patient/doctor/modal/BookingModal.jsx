import {
    Button,
    Label,
    Modal,
    Select,
    Spinner,
    TextInput,
} from "flowbite-react";
import React from "react";
import DoctorProfile from "../DoctorProfile";
import { useState } from "react";
import { useEffect } from "react";
import DatePicker from "tailwind-datepicker-react";
import { createBooking } from "../../../../api/bookingService";

function BookingModal(props) {
    const { dataSent, isShowModal, closeModal } = props;
    const [daytime, setDaytime] = useState(null);
    useEffect(() => {
        if (dataSent && dataSent.date) {
            let d = new Date(dataSent.date);
            d = d.toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                weekday: "long",
            });
            setDaytime(d);
        }
    }, [dataSent]);

    const ModalForm = (props) => {
        const validate = () => {
            const key = Object.keys(initState);
            for (let index = 0; index < key.length; index++) {
                const element = key[index];
                if (!bookingReq[element]) {
                    alert("Bạn chưa điền " + element);
                    return false;
                }
            }
            return true;
        };
        const handelSubmit = () => {
            if (!validate()) return;
            const { firstName, lastName } = dataSent.userData;
            const doctorName = `${firstName} ${lastName}`;
            let _bookingReq = {
                ...bookingReq,
                date: bookingReq.birthday,
                timeString: `${dataSent.timeTypeData.valueVi} - ${daytime}`,
                doctorName: doctorName,
            };
            setIsLoading(true);
            createBooking(_bookingReq).then((res) => {
                console.log(res);
                setIsLoading(false);
            });
        };
        const initState = {
            fullName: "",
            phone: "",
            email: "",
            address: "",
            reason: "",
            birthday: "",
            gender: "M",
            doctorId: props.doctorId,
            timeType: dataSent.timeType,
        };
        const [bookingReq, setBookingReq] = useState(initState);
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            let copyState = { ...bookingReq };
            copyState[name] = value;
            setBookingReq({
                ...copyState,
            });
        };

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

        const handleChange = (time) => {
            setBookingReq({
                ...bookingReq,
                birthday: time.getTime(),
            });
        };

        const [isLoading, setIsLoading] = useState(false);

        return (
            <>
                <div className="grid grid-cols-2 gap-2">
                    <div className="">
                        <div className="mb-2 block">
                            <Label htmlFor="bookfor" value="Đặt cho" />
                        </div>
                        <Select id="bookfor" required={true}>
                            <option>Bản thân tôi</option>
                            <option>Người thân của tôi</option>
                        </Select>
                    </div>
                    <div className="relative">
                        <div className="mb-2 block">
                            <Label value="Ngày sinh" />
                        </div>
                        <DatePicker
                            options={ops}
                            onChange={handleChange}
                            show={show}
                            setShow={() => setShow(!show)}
                        />
                    </div>
                    <div className="">
                        <div className="mb-2 block">
                            <Label htmlFor="fullname" value="Họ tên" />
                        </div>
                        <TextInput
                            id="fullname"
                            type="text"
                            placeholder="Họ và tên"
                            required={true}
                            shadow={true}
                            className="mb-2"
                            name="fullName"
                            value={bookingReq.fullName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="">
                        <div className="mb-2 block">
                            <Label htmlFor="gender" value="Giới tính" />
                        </div>
                        <Select
                            id="gender"
                            required={true}
                            name="gender"
                            onChange={handleInputChange}
                        >
                            <option value="M">Nam</option>
                            <option value="F">Nữ</option>
                        </Select>
                    </div>

                    <div className="">
                        <div className="mb-2 block">
                            <Label htmlFor="phone" value="Số điện thoại" />
                        </div>
                        <TextInput
                            id="phone"
                            type="text"
                            placeholder="Số điện thoại"
                            required={true}
                            shadow={true}
                            className="mb-2"
                            name="phone"
                            value={bookingReq.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="">
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            placeholder="nguyenvana@test.com"
                            required={true}
                            shadow={true}
                            className="mb-2"
                            name="email"
                            value={bookingReq.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="">
                        <div className="mb-2 block">
                            <Label htmlFor="reason" value="Lý do khám" />
                        </div>
                        <TextInput
                            id="reason"
                            type="text"
                            placeholder="Nhập lý do"
                            required={true}
                            shadow={true}
                            name="reason"
                            value={bookingReq.reason}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="">
                        <div className="mb-2 block">
                            <Label htmlFor="address" value="Địa chỉ" />
                        </div>
                        <TextInput
                            id="address"
                            type="text"
                            placeholder="Nhập địa chỉ liên hệ"
                            required={true}
                            shadow={true}
                            name="address"
                            value={bookingReq.address}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="flex pt-5 gap-x-3">
                    <Button onClick={handelSubmit}>
                        {isLoading && (
                            <div className="mr-3">
                                <Spinner size="sm" light={true} />
                            </div>
                        )}
                        Xác nhận
                    </Button>
                    <Button color="failure" onClick={closeModal}>
                        Đóng
                    </Button>
                </div>
            </>
        );
    };

    return (
        <Modal show={isShowModal} onClose={closeModal} size="4xl">
            <Modal.Header>Xác nhận thông tin lịch khám</Modal.Header>
            <Modal.Body>
                <DoctorProfile
                    doctorId={
                        dataSent
                            ? dataSent.doctorId
                                ? dataSent.doctorId
                                : -1
                            : -1
                    }
                    showDesc={false}
                />
                {dataSent && (
                    <div className="font-semibold mb-3">
                        <span>Thời gian: </span>
                        {dataSent.timeTypeData
                            ? dataSent.timeTypeData.valueVi
                            : "Không có thông tin"}
                        <span> - {daytime ? daytime : ""}</span>
                        <p className="font-normal">
                            <small>Phí đặt lịch hẹn: 0đ</small>
                        </p>
                    </div>
                )}
                <ModalForm doctorId={dataSent.doctorId} />
            </Modal.Body>
        </Modal>
    );
}

export default BookingModal;
