import { Button, Table } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";
import { findAllCategory, removeCategory } from "../../api/categoryService";
import { Link, useNavigate } from "react-router-dom";

function AllCategory() {
    const navigate = useNavigate();
    const [lstCatgories, setLstCatgories] = useState([]);
    useEffect(() => {
        findAllCategory().then((res) => {
            setLstCatgories(res.data);
        });
    }, []);
    const handleDelete = (id) => {
        removeCategory(id).then(() => {
            setLstCatgories(lstCatgories.filter((item) => item.id !== id));
        });
    };

    return (
        <section>
            <div className="mb-5 flex justify-between items-center">
                <h1 className="text-2xl uppercase font-semibold">
                    Quản lý danh mục
                </h1>
                <Button
                    onClick={() => navigate("/admin/category/add")}
                    size={"sm"}
                >
                    Thêm danh mục
                </Button>
            </div>
            <Table>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Tên danh mục</Table.HeadCell>
                    <Table.HeadCell>Slug</Table.HeadCell>
                    <Table.HeadCell>Hành động</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {lstCatgories.length > 0 ? (
                        lstCatgories.map((item) => {
                            return (
                                <Table.Row
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    key={item.id}
                                >
                                    <Table.Cell>{item.id}</Table.Cell>
                                    <Table.Cell>{item.name}</Table.Cell>

                                    <Table.Cell>{item.slug}</Table.Cell>
                                    <Table.Cell>
                                        <div className="flex gap-x-5">
                                            <Link
                                                to={`/admin/category/edit/${item.id}`}
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
                            <Table.Cell colSpan={5} className="text-center">
                                Không có dữ liệu
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </section>
    );
}

export default AllCategory;
