import React from "react";
import { useSearchParams } from "react-router-dom";

function BookingSuccess() {
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    return (
        <div className="max-w-screen-xl mx-auto my-5 min-h-[300px] flex items-center justify-center flex-col">
            <h1 className="font-semibold text-indigo-600 text-3xl">
                Đặt lịch thành công
            </h1>
            <p className="text-gray-500 mt-3">
                Vui lòng kiểm tra email chúng tôi đã gửi vào hộp thư{" "}
                <span className="text-purple-600">
                    {email ? email : "email"}
                </span>
            </p>
        </div>
    );
}

export default BookingSuccess;
