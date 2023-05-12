import { Avatar, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { APP_URL } from "../../api/_configApi";
import { Link } from "react-router-dom";
import { docTitle } from "../../utils/constant";
import { findAllClinic, removeClinic } from "../../api/clinicService";

function ManageClinic() {
    const [clinicsList, setClinicsList] = useState([]);
    useEffect(() => {
        document.title = docTitle.ADMIN.clinic_manage;
        findAllClinic().then((res) => {
            if (res && res.data) setClinicsList(res.data);
        });
    }, []);
    const handleDelete = (id) => {
        if (!id) {
            alert("Khong tìm thấy id");
            return;
        }
        removeClinic(id).then((res) => {
            if (res && res.data && res.data.statusCode === 0) {
                setClinicsList(clinicsList.filter((item) => item.id !== id));
            }
        });
    };

    return (
        <>
            <div className="mb-5">
                <h1 className="text-2xl uppercase font-semibold">
                    Quản lý phòng khám
                </h1>
            </div>
            <Table>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Hình ảnh</Table.HeadCell>
                    <Table.HeadCell>Tên phòng khám</Table.HeadCell>
                    <Table.HeadCell>Địa chỉ</Table.HeadCell>
                    <Table.HeadCell>Hành động</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {clinicsList &&
                        clinicsList.map((item) => {
                            return (
                                <Table.Row
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    key={item.id}
                                >
                                    <Table.Cell>{item.id}</Table.Cell>
                                    <Table.Cell className="w-28">
                                        {item.image ? (
                                            <Avatar
                                                img={`${APP_URL}/clinic/image/${item.image}`}
                                            />
                                        ) : (
                                            <Avatar />
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>{item.name}</Table.Cell>
                                    <Table.Cell>{item.address}</Table.Cell>
                                    <Table.Cell>
                                        <div className="flex gap-x-5">
                                            <Link
                                                to={`edit/${item.id}`}
                                                className="font-medium text-blue-600 hover:underline"
                                            >
                                                Sửa
                                            </Link>
                                            <button
                                                to={`delete/${item.id}`}
                                                className="font-medium text-red-600 hover:underline"
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                            >
                                                Xoá
                                            </button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
                </Table.Body>
            </Table>
        </>
    );
}

export default ManageClinic;
