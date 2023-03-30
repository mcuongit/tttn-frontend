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
import {
    deleteMultipleRecord,
    deleteUser,
    getAllUsers,
} from "../../../api/userService";
import CustomBreadcumb from "../../../components/common/CustomBreadcumb";
import { docTitle } from "../../../utils/constant";

function UsersManage() {
    const endpoint = "";
    const crumbs = [
        { name: "Trang chủ", link: "/admin" },
        { name: "Tài khoản", link: undefined },
    ];
    const [usersList, setUsersList] = useState([]);
    const [checkDelete, setCheckDelete] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checkList, setCheckList] = useState([]);
    const [alertContent, setAlertContent] = useState({
        color: "",
        msg: "",
    });
    // call api
    useEffect(() => {
        const { users } = docTitle.ADMIN;
        document.title = users;
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
                if (res.data.statusCode === 0) {
                    setUsersList(usersList.filter((key) => key.id !== id));
                    setAlertContent({
                        color: "success",
                        msg: res.data.message,
                    });
                    setCheckDelete(true);
                } else {
                    setAlertContent({
                        color: "failure",
                        msg: res.data.message,
                    });
                    setCheckDelete(true);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleCheckBoxChange = (e) => {
        const { checked, value } = e.target;
        const n_value = Number(value);
        if (checked) {
            let list = [...checkList];
            list.push(n_value);
            setCheckList(list);
        } else {
            setCheckList(checkList.filter((item) => item !== n_value));
        }
    };

    const handleMultipleDelete = () => {
        if (checkList.length === 0) {
            alert("Vui lòng chọn ít nhất 1 sản phẩm để xoá");
            return;
        } else if (checkList.length === usersList.length) {
            alert("Cần để lại tối thiểu 1 tài khoản");
            return;
        }
        deleteMultipleRecord("del-mul", checkList)
            .then((res) => {
                if (res && res.data && res.data.affected) {
                    const { affected } = res.data;
                    if (affected <= 0) return;
                    setAlertContent({
                        color: "success",
                        msg: `Xoá thành công ${affected} tài khoản.`,
                    });
                    let a = [...usersList];
                    checkList.forEach((element) => {
                        a = a.filter((item) => item.id !== element);
                    });
                    setUsersList(a);
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
                <div className="flex gap-x-2">
                    <Button className="uppercase mb-3" size={"xs"}>
                        <AddIcon className="h-5 w-5" />
                        <Link to={"/admin/users/add"}>Thêm user</Link>
                    </Button>
                    <Button
                        className="uppercase mb-3"
                        size={"xs"}
                        color="failure"
                        disabled={checkList.length === 0 ? true : false}
                        onClick={handleMultipleDelete}
                    >
                        <TrashIcon />
                        Xoá user
                    </Button>
                </div>
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
                                                Đang tải...
                                            </span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            usersList &&
                            usersList.length > 0 &&
                            usersList.map((item) => (
                                <Table.Row key={item.id} className="bg-white">
                                    <Table.Cell className="!p-4">
                                        <Checkbox
                                            value={item.id}
                                            onChange={(e) =>
                                                handleCheckBoxChange(e)
                                            }
                                        />
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                        {item.firstName}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                        {item.lastName}
                                    </Table.Cell>
                                    <Table.Cell>{item.email}</Table.Cell>
                                    <Table.Cell>{item.address}</Table.Cell>
                                    <Table.Cell>
                                        <div className="flex gap-x-4 w-full">
                                            <Link
                                                to={`/admin/users/edit/${item.id}`}
                                                className="font-medium text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    handleDelete(item.id);
                                                }}
                                                className="font-medium text-red-600 hover:underline"
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

const TrashIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
        >
            <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                clipRule="evenodd"
            />
        </svg>
    );
};

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

export default UsersManage;
