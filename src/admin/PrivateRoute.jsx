import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (_.isEmpty(userInfo)) {
    return (
      <div className="h-screen flex justify-center items-center bg-white">
        <div className="bg-sky-50 py-10 px-14 shadow-lg rounded flex flex-col justify-center items-center gap-2 tracking-tight">
          <h1 className="text-5xl text-red-500 font-bold">401</h1>
          <h2 className="font-bold text-3xl text-red-500 uppercase">
            Unauthorized
          </h2>
          <h2 className="text-gray-500">
            Bạn không có quyền truy cập trang này
          </h2>
          <p className="font-semibold">
            Để tiếp tục truy cập, vui lòng{" "}
            <Link to="/login" className="hover:underline text-blue-600">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default PrivateRoute;
