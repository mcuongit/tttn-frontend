import _ from "lodash";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    document.title = "Admin";
  }, []);

  if (_.isEmpty(userInfo)) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#3d3d3d]">
        <div className="flex flex-col justify-center items-center gap-2 tracking-tight text-[#ffd154]">
          <h1 className="text-5xl font-bold">401</h1>
          <h2 className="font-bold text-3xl uppercase">Unauthorized</h2>
          <h2 className="text-slate-300">
            Bạn không có quyền truy cập trang này
          </h2>
          <p className="font-semibold">
            Để tiếp tục truy cập, vui lòng{" "}
            <Link to="/login" className="underline text-blue-600">
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
