import { Alert, Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleLoginService } from "../../api/loginService";
import { handleLogin } from "../../features/admin/slices/loginSlice";
import { saveUser } from "../../features/admin/slices/userSlice";
import { path } from "../../utils/constant";
// import

function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [emailValid, setEmailValid] = useState(true);
    const [pwdValid, setPwdValid] = useState(true);
    const [response, setResponse] = useState({
        res: false,
        msg: "",
    });
    const selector = useSelector((state) => state.auth.isLogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const form = useRef();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.current.checkValidity()) {
            if (!user.email) {
                setEmailValid(false);
            } else {
                setEmailValid(true);
            }
            if (!user.password) {
                setPwdValid(false);
            } else {
                setPwdValid(true);
            }
            return;
        }
        handleLoginService("", user)
            .then((res) => {
                if (res && res.data.statusCode !== 0) {
                    setResponse({
                        res: true,
                        msg: res.data.message,
                    });
                } else {
                    dispatch(handleLogin(true));
                    dispatch(saveUser(res.data.user));
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (selector) navigate(path.ADMIN);
    }, [selector]);

    return (
        <>
            <main className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0">
                    <Link
                        to={path.ADMIN}
                        className="flex items-center justify-center mb-8 text-3xl font-semibold"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="-40 -40 80 80"
                            className="h-11 w-11 mr-4"
                        >
                            <circle r="39" />
                            <path
                                fill="#fff"
                                d="M0,38a38,38 0 0 1 0,-76a19,19 0 0 1 0,38a19,19 0 0 0 0,38"
                            />
                            <circle r="5" cy="19" fill="#fff" />
                            <circle r="5" cy="-19" />
                        </svg>
                        <span>Quản trị</span>
                    </Link>
                    {/* Card */}
                    <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Đăng nhập vào nền tảng
                        </h2>
                        <form
                            className="mt-8 space-y-6"
                            onSubmit={handleSubmit}
                            ref={form}
                            noValidate
                        >
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value="Email" />
                                </div>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={user.name}
                                    color={emailValid ? "" : "failure"}
                                    helperText={
                                        emailValid ? (
                                            ""
                                        ) : (
                                            <span className="font-medium">
                                                Email không hợp lệ
                                            </span>
                                        )
                                    }
                                    placeholder="name@flowbite.com"
                                    required={true}
                                    onChange={(e) => {
                                        handleInputChange(e);
                                    }}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="password"
                                        value="Mật khẩu"
                                    />
                                </div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    color={pwdValid ? "" : "failure"}
                                    helperText={
                                        pwdValid ? (
                                            ""
                                        ) : (
                                            <span className="font-medium">
                                                Mật khẩu không được bỏ trống
                                            </span>
                                        )
                                    }
                                    required={true}
                                    onChange={(e) => {
                                        handleInputChange(e);
                                    }}
                                />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="remember" />
                                    <Label htmlFor="remember">
                                        Nhớ tài khoản
                                    </Label>
                                </div>
                                <a
                                    href="#"
                                    className="ml-auto text-sm text-blue-700 hover:underline"
                                >
                                    Quên mật khẩu?
                                </a>
                            </div>
                            {response.res && (
                                <Alert color="failure">
                                    <span>{response.msg}</span>
                                </Alert>
                            )}
                            <div className="flex justify-center">
                                <Button type="submit">
                                    Đăng nhập vào tài khoản
                                </Button>
                            </div>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Chưa có tài khoản?{" "}
                                <a className="text-blue-700 hover:underline dark:text-primary-500 cursor-pointer">
                                    Tạo tài khoản
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Login;
