import { Alert, Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../utils/constant";
import { userLogin } from "../../features/auth/authAction";
import _ from "lodash";

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
  const { userInfo } = useSelector((state) => state.auth);
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

  const handleSubmit = async (e) => {
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
    } else {
      setEmailValid(true);
      setPwdValid(true);
    }
    const res = await dispatch(
      userLogin({ email: user.email, password: user.password })
    );
    if (res && res.error.message === "Rejected") {
      console.log(res.payload);
      setResponse({
        res: true,
        msg: res.payload,
      });
    }
  };

  useEffect(() => {
    document.title = "Đăng nhập";
  }, []);

  useEffect(() => {
    if (!_.isEmpty(userInfo)) navigate(path.ADMIN);
  }, [navigate, userInfo]);

  return (
    <>
      <main className="bg-[url('src/assets/images/login/2.jpg')] bg-center bg-cover bg-fixed bg-no-repeat h-screen">
        <div className="flex flex-col items-center justify-center h-full">
          <Link
            to={path.ADMIN}
            className="flex gap-x-3 items-center justify-center mb-3 text-3xl font-semibold"
          >
            <img src="/only_logo.png" alt="logo" className="h-11 w-11" />
            <span>Quản trị</span>
          </Link>
          {/* Card */}
          <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 backdrop-blur bg-[rgba(255,255,255,0.5)] rounded-lg shadow">
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
                  color={emailValid ? "gray" : "failure"}
                  helperText={
                    emailValid ? (
                      ""
                    ) : (
                      <span className="font-medium">Email không hợp lệ</span>
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
                  <Label htmlFor="password" value="Mật khẩu" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  name="password"
                  value={user.password}
                  color={pwdValid ? "gray" : "failure"}
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
                  <Label htmlFor="remember">Nhớ tài khoản</Label>
                </div>
                <a
                  href="#"
                  className="ml-auto text-sm text-blue-700 hover:underline"
                >
                  Quên mật khẩu?
                </a>
              </div>
              {response.res && (
                <Alert color="failure" className="border border-red-600">
                  <span>{response.msg}</span>
                </Alert>
              )}
              <div className="flex justify-center">
                <Button type="submit">Đăng nhập vào tài khoản</Button>
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
