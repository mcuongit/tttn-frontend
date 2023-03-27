import {
    Alert,
    Button,
    Checkbox,
    Spinner,
    Table,
    TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../../api/userService";
import CustomBreadcumb from "../../../components/common/CustomBreadcumb";

function UsersManage() {
    const endpoint = "";
    const crumbs = [
        { name: "Trang chủ", link: "/admin" },
        { name: "Tài khoản", link: undefined },
    ];
    const AddIcon = (props) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={props.className ? props.className : "h-5 w-5"}
        >
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
    );
    const [usersList, setUsersList] = useState([]);
    const [checkDelete, setCheckDelete] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertContent, setAlertContent] = useState({
        color: "",
        msg: "",
    });
    // call api
    useEffect(() => {
        setLoading(true);
        getAllUsers(endpoint).then((res) => {
            setUsersList(res.data);
            setLoading(false);
        });
    }, []);

    // delete
    const handleDelete = (id) => {
        deleteUser(id)
            .then((res) => {
                if (res.data.errCode === 0) {
                    setUsersList(usersList.filter((key) => key.id !== id));
                    setAlertContent({
                        color: "success",
                        msg: res.data.message,
                    });
                    setCheckDelete(true);
                } else {
                    setAlertContent({
                        color: "failure",
                        msg: res.data.messgae,
                    });
                    setCheckDelete(true);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div className="relative">
            <div className="mb-3">
                <CustomBreadcumb crumbs={crumbs} />
            </div>
            <h1 className="uppercase text-2xl font-semibold mb-5">
                tất cả tài khoản
            </h1>
            <div className="flex justify-between mb-3">
                <div className="w-1/3">
                    <TextInput
                        id="email1"
                        type="text"
                        placeholder="Search for users"
                        required={true}
                    />
                </div>
                <Button className="uppercase mb-3" size={"xs"}>
                    <AddIcon className="h-5 w-5" />
                    <Link to={"/admin/users/add"}>Thêm user</Link>
                </Button>
            </div>
            <div className="">
                {checkDelete && (
                    <div className="my-3">
                        <Alert
                            color={alertContent.color}
                            onDismiss={() => {
                                setCheckDelete(false);
                            }}
                        >
                            <span id="alert-content">{alertContent.msg}</span>
                        </Alert>
                    </div>
                )}
                <Table hoverable={true}>
                    <Table.Head>
                        <Table.HeadCell className="!p-4">#</Table.HeadCell>
                        <Table.HeadCell>First name</Table.HeadCell>
                        <Table.HeadCell>Last name</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Address</Table.HeadCell>
                        <Table.HeadCell>Action</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {loading ? (
                            <tr>
                                <td colSpan={6}>
                                    <div className="flex items-center justify-center w-full h-14 border border-gray-200 rounded-lg bg-gray-50">
                                        <div className="px-3 py-1 text-base font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse">
                                            <Spinner size="sm" />
                                            <span className="ml-2">
                                                Loading...
                                            </span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            usersList &&
                            usersList.map((item) => (
                                <Table.Row
                                    key={item.id}
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <Table.Cell className="!p-4">
                                        <Checkbox />
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {item.firstName}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {item.lastName}
                                    </Table.Cell>
                                    <Table.Cell>{item.email}</Table.Cell>
                                    <Table.Cell>{item.address}</Table.Cell>
                                    <Table.Cell>
                                        <div className="flex gap-x-4 w-full">
                                            <Link
                                                to={`/admin/users/edit/${item.id}`}
                                                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    handleDelete(item.id);
                                                }}
                                                className="font-medium text-red-600 hover:underline dark:text-red-500"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        )}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
}

export default UsersManage;
