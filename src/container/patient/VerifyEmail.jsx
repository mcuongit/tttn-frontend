import { useSearchParams } from "react-router-dom";
import { veriryEmail } from "../../api/verifyEmailService";
import { useEffect, useState } from "react";

function VerifyEmail() {
  useEffect(() => {
    document.title = "Xác nhận lịch khám";
  }, []);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const doctorId = searchParams.get("doctorId");
  const [result, setResult] = useState("");
  useEffect(() => {
    if (token && searchParams) {
      const data = {
        token: token,
        doctorId: doctorId,
      };
      veriryEmail(data)
        .then((res) => {
          if (res && res.data && res.data.statusCode === 0) {
            setResult(res.data.message);
          }
        })
        .catch((e) => {
          setResult(e.response.data.message);
        });
    }
  }, []);

  return (
    <div>
      <div className="max-w-screen-lg mx-auto min-h-[400px] flex flex-col justify-center items-center">
        <h1 className="font-semibold text-indigo-600 text-3xl">
          {result ? result : "Có lỗi xảy ra."}
        </h1>
      </div>
    </div>
  );
}

export default VerifyEmail;
