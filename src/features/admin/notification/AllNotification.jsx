import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import {
    deleteNotification,
    findAllNotification,
} from "../../../api/notificationService";
import { Link } from "react-router-dom";

function AllNotification() {
    const [lstNotice, setLstNotice] = useState([]);
    useEffect(() => {
        document.title = "Quản lý thông báo";
        findAllNotification().then((res) => {
            setLstNotice(res.data);
        });
    }, []);
    const handleDelete = (id) => {
        deleteNotification(id).then(() => {
            setLstNotice(lstNotice.filter((item) => item.id !== id));
            alert("Xoá thành công");
        });
    };

    return (
        <section>
            <div className="mb-5">
                <h1 className="text-2xl uppercase font-semibold">
                    Quản lý thông báo
                </h1>
            </div>
            <Table>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Loại</Table.HeadCell>
                    <Table.HeadCell>Tiêu đề</Table.HeadCell>
                    <Table.HeadCell>Nội dung</Table.HeadCell>
                    <Table.HeadCell>Hành động</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {lstNotice.length > 0 ? (
                        lstNotice.map((item) => {
                            let tb = "Thông báo";
                            if (tb === "important") tb = "Quan trọng";
                            if (tb === "default") tb = "Mặc định";
                            return (
                                <Table.Row
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    key={item.id}
                                >
                                    <Table.Cell>{item.id}</Table.Cell>
                                    <Table.Cell>{tb}</Table.Cell>
                                    <Table.Cell>{item.title}</Table.Cell>
                                    <Table.Cell className="max-w-sm truncate">
                                        {item.content}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex gap-x-5">
                                            <Link
                                                to={`/admin/notification/edit/${item.id}`}
                                                className="font-medium text-blue-600 hover:underline"
                                            >
                                                Sửa
                                            </Link>
                                            <button
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
                        })
                    ) : (
                        <Table.Row>
                            <Table.Cell colSpan={5}>
                                Không có dữ liệu
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </section>
    );
}

export default AllNotification;
