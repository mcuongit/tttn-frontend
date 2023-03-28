import { Alert, Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLoginService } from "../../api/loginService";
import { handleLogin } from "../../features/admin/slices/loginSlice";
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
    const [isAuth, setIsAuth] = useState(false);
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
                if (res.data.statusCode !== 0) {
                    setResponse({
                        res: true,
                        msg: res.data.message,
                    });
                } else {
                    dispatch(handleLogin(true));
                    setIsAuth(true);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (isAuth) {
            console.log(isAuth);
            navigate(path.ADMIN);
        }
    }, [isAuth]);

    return (
        <>
            <main className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0">
                    <a
                        href="https://flowbite-admin-dashboard.vercel.app/"
                        className="flex items-center justify-center mb-8 text-2xl font-semibold"
                    >
                        <img
                            src="https://flowbite-admin-dashboard.vercel.app/images/logo.svg"
                            className="mr-4 h-11"
                            alt="FlowBite Logo"
                        />
                        <span>Flowbite</span>
                    </a>
                    {/* Card */}
                    <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
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
