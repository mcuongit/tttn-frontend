import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import React from "react";
import DoctorProfile from "../DoctorProfile";
import { useState } from "react";
import { useEffect } from "react";

function BookingModal(props) {
    const { isShowModal, closeModal, dataSent } = props;
    const [daytime, setDaytime] = useState(null);
    const initState = {
        fullName: "",
        phone: "",
        email: "",
        address: "",
        reason: "",
        birthday: "",
        gender: "",
        doctorId: "",
    };
    const [bookingReq, setBookingReq] = useState(initState);
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        weekday: "long",
    };
    useEffect(() => {
        if (dataSent && dataSent.date) {
            let d = new Date(dataSent.date);
            d = d.toLocaleDateString("vi-VN", options);
            setDaytime(d);
        }
    }, [dataSent]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setBookingReq({
            ...bookingReq,
            [name]: value,
        });
    };

    useEffect(() => {
        console.table(bookingReq);
    }, [bookingReq]);

    return (
        <React.Fragment>
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
                        <div className="">
                            <div className="mb-2 block">
                                <Label htmlFor="gender" value="Giới tính" />
                            </div>
                            <Select
                                id="gender"
                                required={true}
                                value={bookingReq.gender}
                                name="gender"
                                onChange={(e) => handleInputChange(e)}
                            >
                                <option value="M">Nam</option>
                                <option value="F">Nữ</option>
                            </Select>
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
                                value={bookingReq.fullName}
                                name="fullName"
                                onChange={(e) => handleInputChange(e)}
                            />
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
                                value={bookingReq.phone}
                                name="phone"
                                onChange={(e) => handleInputChange(e)}
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
                                value={bookingReq.email}
                                name="email"
                                onChange={(e) => handleInputChange(e)}
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
                                value={bookingReq.reason}
                                onChange={(e) => handleInputChange(e)}
                                name="reason"
                            />
                        </div>
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
                            value={bookingReq.address}
                            onChange={(e) => handleInputChange(e)}
                            name="address"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeModal}>Xác nhận</Button>
                    <Button color="failure" onClick={closeModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

export default BookingModal;
