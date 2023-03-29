import {
    Alert,
    Button,
    Label,
    Select,
    Spinner,
    TextInput,
    Tooltip,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getAllcodeService,
    getOneUser,
    updateUserService,
    uploadImg,
} from "../../../api/userService";
import CustomBreadcumb from "../../../components/common/CustomBreadcumb";

function UserEdit() {
    const endpoint = "";
    // state
    const [previewImg, setPreviewImg] = useState();
    const [gender, setGender] = useState([]);
    const [position, setPosition] = useState([]);
    const [role, setRole] = useState([]);
    const [isValid, setIsValid] = useState(true);
    const [isAddedImg, setIsAddedImg] = useState(false);
    const [alertContent, setAlertContent] = useState({
        color: "",
        msg: "",
    });
    const [loading, setLoading] = useState(false);
    const initState = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phone: "",
        gender: "",
        positionId: "",
        roleId: "",
        image: "",
    };
    const [user, setUser] = useState(initState);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getOneUser(id)
            .then((res) => {
                setUser(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    // avatar preview
    const handleChangeImg = (e) => {
        const data = e.target.files;
        const file = data[0];
        if (file) {
            setPreviewImg(file);
        }
    };

    // call api before run
    useEffect(() => {
        getAllcodeService("GENDER")
            .then((res) => {
                setGender(res.data.data);
                return getAllcodeService("POSITION");
            })
            .then((res) => {
                setPosition(res.data.data);
                return getAllcodeService("ROLE");
            })
            .then((res) => {
                setRole(res.data.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    // validate input not empty
    const validateInput = () => {
        const arrInput = [...Object.keys(initState)];
        arrInput.splice(1, 1);
        arrInput.pop();
        for (let i = 0; i < arrInput.length; i++) {
            if (!user[arrInput[i]]) {
                setAlertContent({
                    color: "failure",
                    msg: "Bạn chưa điền: " + arrInput[i],
                });
                setIsValid(false);
                return false;
            }
        }
        return true;
    };

    const updateUser = () => {
        updateUserService(id, user)
            .then((res) => {
                if (res.data.statusCode !== 0) {
                    setAlertContent({
                        color: "failure",
                        msg: res.data.message,
                    });
                    setIsValid(false);
                } else {
                    navigate("/admin/users/manage");
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (isAddedImg) {
            updateUser();
            setIsAddedImg(false);
        }
    }, [isAddedImg]);

    // save user
    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = validateInput();
        if (valid) {
            setLoading(true);
            if (previewImg) {
                const formData = new FormData();
                formData.append("image", previewImg);
                uploadImg("upload", formData)
                    .then((response) => {
                        setUser({
                            ...user,
                            image: response.data.name,
                        });
                        setIsAddedImg(true);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            } else {
                updateUser();
            }
            setLoading(false);
        }
    };
    // breadcrumbs
    const crumbs = [
        { name: "Trang chủ", link: "/admin" },
        { name: "Tài khoản", link: "/admin/users/manage" },
        { name: "Sửa tài khoản", link: undefined },
    ];

    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            encType="multipart/form-data"
            noValidate
        >
            <div className="mb-3">
                <CustomBreadcumb crumbs={crumbs} />
            </div>
            <div className="flex justify-between">
                <h1 className="uppercase text-2xl font-semibold mb-5">
                    Sửa người dùng
                </h1>
                <Button
                    size={"xs"}
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <ArrowLeftIcon />
                    <span>Quay lại</span>
                </Button>
            </div>
            {!isValid && (
                <div className="my-3">
                    <Alert
                        color={alertContent.color}
                        id="ct-f"
                        onDismiss={() => {
                            setIsValid(true);
                        }}
                    >
                        <span id="alert-content">{alertContent.msg}</span>
                    </Alert>
                </div>
            )}
            <div className="flex flex-wrap gap-y-4 justify-center">
                <div className="basis-3/12">
                    <Label htmlFor="avatar" value="Ảnh đại diện" />
                    <input
                        className="hidden"
                        type="file"
                        name="image"
                        id="avatar"
                        onChange={(e) => {
                            handleChangeImg(e);
                        }}
                    />
                    <label
                        htmlFor="avatar"
                        className="mt-2 w-56 h-56 rounded-lg border-2 border-dashed flex justify-center items-center"
                    >
                        {previewImg ? (
                            <img
                                src={URL.createObjectURL(previewImg)}
                                alt="avatar preview"
                                className="max-w-full h-auto"
                            />
                        ) : user.image ? (
                            <img
                                src={`${
                                    import.meta.env.VITE_BACKEND_URL
                                }/users/avatar/${user.image}`}
                                alt="avatar"
                                className="max-w-full h-auto"
                            />
                        ) : (
                            <span className="font-mono">Chọn hình</span>
                        )}
                    </label>
                </div>
                <div className="basis-full md:basis-9/12 flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            readOnly
                            placeholder="name@test.com"
                            required={true}
                            name="email"
                            value={user.email}
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Mật khẩu" />
                        </div>
                        <Tooltip content="Không cho phép sửa mật khẩu">
                            <TextInput
                                id="password"
                                type="password"
                                required={true}
                                disabled
                                name="password"
                                placeholder="Mật khẩu"
                                className="cursor-not-allowed w-full"
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                            />
                        </Tooltip>
                    </div>
                    <div className="flex w-full md:flex-row flex-col gap-x-3">
                        <div className="basis-1/2">
                            <div className="mb-2 block">
                                <Label htmlFor="firstname" value="Họ" />
                            </div>
                            <TextInput
                                id="firstname"
                                type="text"
                                required={true}
                                placeholder="Nguyễn Văn"
                                value={user.firstName}
                                name="firstName"
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                            />
                        </div>
                        <div className="basis-1/2">
                            <div className="mb-2 block">
                                <Label htmlFor="lastname" value="Tên" />
                            </div>
                            <TextInput
                                id="lastname"
                                type="text"
                                required={true}
                                placeholder="Huy"
                                name="lastName"
                                value={user.lastName}
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="basis-full flex flex-col md:flex-row md:flex-wrap gap-y-4 justify-center">
                    <div className="basis-1/3 px-1">
                        <div className="mb-2 block">
                            <Label htmlFor="phone" value="Điện thoại" />
                        </div>
                        <TextInput
                            id="phone"
                            type="tel"
                            required={true}
                            placeholder="Nhập số điện thoại"
                            value={user.phone}
                            name="phone"
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                        />
                    </div>
                    <div className="basis-1/3 px-1">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="gender" value="Giới tính" />
                            </div>
                            <Select
                                id="gender"
                                required={true}
                                value={user.gender}
                                name="gender"
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                            >
                                {gender &&
                                    gender.map((item) => (
                                        <option key={item.id} value={item.key}>
                                            {item.valueVi}
                                        </option>
                                    ))}
                            </Select>
                        </div>
                    </div>
                    <div className="basis-1/3 px-1">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="position" value="Chức danh" />
                            </div>
                            <Select
                                id="position"
                                required={true}
                                name="positionId"
                                value={user.positionId}
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                            >
                                {position &&
                                    position.map((item) => (
                                        <option key={item.id} value={item.key}>
                                            {item.valueVi}
                                        </option>
                                    ))}
                            </Select>
                        </div>
                    </div>
                    <div className="basis-1/3 px-1">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="role" value="Quyền" />
                            </div>
                            <Select
                                id="role"
                                required={true}
                                value={user.roleId}
                                name="roleId"
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                            >
                                {role &&
                                    role.map((item) => (
                                        <option key={item.id} value={item.key}>
                                            {item.valueVi}
                                        </option>
                                    ))}
                            </Select>
                        </div>
                    </div>
                    <div className="basis-2/3 px-1">
                        <div className="mb-2 block">
                            <Label htmlFor="address" value="Địa chỉ" />
                        </div>
                        <TextInput
                            id="address"
                            type="tel"
                            required={true}
                            placeholder="VD: Thủ Đức, TP. Hồ Chí Minh"
                            name="address"
                            value={user.address}
                            onChange={(e) => {
                                handleInputChange(e);
                            }}
                        />
                    </div>
                    <div className="basis-4/12">
                        <Button type="submit" className="w-full">
                            {loading && (
                                <div className="mr-3">
                                    <Spinner />
                                </div>
                            )}
                            <span>Lưu thay đổi</span>
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}

const ArrowLeftIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
        >
            <path
                fillRule="evenodd"
                d="M20.25 12a.75.75 0 01-.75.75H6.31l5.47 5.47a.75.75 0 11-1.06 1.06l-6.75-6.75a.75.75 0 010-1.06l6.75-6.75a.75.75 0 111.06 1.06l-5.47 5.47H19.5a.75.75 0 01.75.75z"
                clipRule="evenodd"
            />
        </svg>
    );
};

export default UserEdit;
