import { Avatar, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { getAllSpecs, removeSpecs } from "../../api/specialtyService";
import { APP_URL } from "../../api/_configApi";
import { Link } from "react-router-dom";
import { docTitle } from "../../utils/constant";

function ManageSpecialty() {
    const [specsList, setSpecsList] = useState([]);
    useEffect(() => {
        document.title = docTitle.ADMIN.spec_manage;
        getAllSpecs().then((res) => {
            if (res && res.data) setSpecsList(res.data);
        });
    }, []);
    const handleDelete = (id) => {
        if (!id) {
            alert("Khong tìm thấy id");
            return;
        }
        removeSpecs(id).then((res) => {
            if (res && res.data && res.data.statusCode === 0) {
                setSpecsList(specsList.filter((item) => item.id !== id));
            }
        });
    };

    return (
        <>
            <div className="mb-5">
                <h1 className="text-2xl uppercase font-semibold">
                    Quản lý chuyên khoa
                </h1>
            </div>
            <Table>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Hình ảnh</Table.HeadCell>
                    <Table.HeadCell>Tên khoa</Table.HeadCell>
                    <Table.HeadCell>Hành động</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {specsList &&
                        specsList.map((item) => {
                            return (
                                <Table.Row
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    key={item.id}
                                >
                                    <Table.Cell>{item.id}</Table.Cell>
                                    <Table.Cell className="w-28">
                                        {item.image ? (
                                            <Avatar
                                                img={`${APP_URL}/specialty/image/${item.image}`}
                                            />
                                        ) : (
                                            <Avatar />
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>{item.name}</Table.Cell>
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

export default ManageSpecialty;
