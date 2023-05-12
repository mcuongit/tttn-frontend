import { Button, Table } from "flowbite-react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { findAllPost, removePost } from "../../api/postService";

function AllPost() {
    const navigate = useNavigate();
    const [lstPosts, setLstPosts] = useState([]);
    useEffect(() => {
        document.title = "Bài viết";
        findAllPost().then((res) => {
            setLstPosts(res.data);
        });
    }, []);
    const handleDelete = (id) => {
        const cf = confirm("Xác nhận xoá bài viết " + id + "?");
        if (!cf) return;
        removePost(id).then(() => {
            setLstPosts(lstPosts.filter((item) => item.id !== id));
        });
    };

    return (
        <section>
            <div className="mb-5 flex justify-between items-center">
                <h1 className="text-2xl uppercase font-semibold">
                    Quản lý bài viết
                </h1>
                <Button onClick={() => navigate("/admin/post/add")} size={"sm"}>
                    Thêm bài viết
                </Button>
            </div>
            <Table>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Tiêu đề bài viết</Table.HeadCell>
                    <Table.HeadCell>Nội dung</Table.HeadCell>
                    <Table.HeadCell>Hành động</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {lstPosts.length > 0 ? (
                        lstPosts.map((item) => {
                            return (
                                <Table.Row
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    key={item.id}
                                >
                                    <Table.Cell>{item.id}</Table.Cell>
                                    <Table.Cell>{item.title}</Table.Cell>

                                    <Table.Cell className="max-w-sm truncate">
                                        {item.markdown}
                                    </Table.Cell>
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

export default AllPost;
