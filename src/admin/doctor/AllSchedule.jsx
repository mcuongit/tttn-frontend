import { Button, Label, Select, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { docTitle } from "../../utils/constant";
import { getAllDoctor } from "../../api/doctorService";
import CGDatePicker from "../../components/CGDatePicker";
import { formatDate, getCurrentDate, resetHour } from "../../utils/functions";
import { deleteSchedule, findSchedule } from "../../api/scheduleApi";

function AllSchedule() {
    const [doctorsList, setDoctorsList] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(
        getCurrentDate().getTime()
    );
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [results, setResults] = useState([]);
    const handleChange = (date) => {
        setSelectedDate(resetHour(date).getTime());
    };
    const handleClose = (state) => {
        setShow(state);
    };
    useEffect(() => {
        document.title = docTitle.ADMIN.schedule_mng;
        getAllDoctor("get-all").then((res) => {
            setDoctorsList(res.data.data);
        });
    }, []);

    const handleChangeDoctor = (e) => {
        const { value } = e.target;
        setSelectedDoctor(value);
    };
    const handleDelete = (id) => {
        const cf = confirm("Xoá lịch khám " + id + "?");
        if (!cf) return;
        deleteSchedule(id).then(() => {
            setResults(results.filter((item) => item.id !== id));
        });
    };
    const handleSubmit = () => {
        if (selectedDoctor && selectedDate)
            findSchedule(selectedDoctor, selectedDate).then((res) => {
                setResults(res.data.data);
            });
        else {
            alert("Vui lòng chọn bác sĩ");
        }
    };
    return (
        <section>
            <h1 className="uppercase font-semibold text-2xl mb-5">
                Quản lý lịch khám
            </h1>
            <div className="flex items-end gap-x-5 mb-5">
                <div className="grow">
                    <div className="mb-2 block">
                        <Label htmlFor="dr" value="Chọn bác sĩ" />
                    </div>
                    <Select
                        id="dr"
                        required={true}
                        onChange={handleChangeDoctor}
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
                <div className="grow">
                    <div className="mb-2 block">
                        <Label value="Chọn ngày" />
                    </div>
                    <div className="relative">
                        <CGDatePicker
                            show={show}
                            handleChange={handleChange}
                            handleClose={handleClose}
                        />
                    </div>
                </div>
                <Button onClick={handleSubmit}>Tra cứu</Button>
            </div>
            <div className="">
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Id</Table.HeadCell>
                        <Table.HeadCell>Giờ khám</Table.HeadCell>
                        <Table.HeadCell>Ngày khám</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {results.length > 0 ? (
                            results.map((item) => {
                                return (
                                    <Table.Row
                                        key={item.id}
                                        className="bg-white"
                                    >
                                        <Table.Cell>{item.id}</Table.Cell>
                                        <Table.Cell>
                                            {item.timeTypeData.valueVi}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {formatDate(selectedDate)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <button
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                                className="text-red-600 hover:underline ml-3"
                                            >
                                                Xoá
                                            </button>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })
                        ) : (
                            <Table.Row className="bg-white">
                                <Table.Cell
                                    colSpan={4}
                                    className="text-center text-red-600"
                                >
                                    Không có dữ liệu
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>
        </section>
    );
}

export default AllSchedule;
