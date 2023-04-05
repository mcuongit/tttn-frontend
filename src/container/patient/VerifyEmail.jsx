import { useSearchParams } from "react-router-dom";
import Footers from "../../components/common/Footers";
import Header from "../../components/common/Header";
import { veriryEmail } from "../../api/verifyEmailService";
import { useEffect, useState } from "react";

function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const doctorId = searchParams.get("doctorId");
    const [result, setResult] = useState("");
    useEffect(() => {
        if (token && searchParams) {
            veriryEmail({
                token: token,
                doctorId: doctorId,
            }).then((res) => {
                if (res && res.data && res.data.statusCode !== 3) {
                    setResult(res.data.message);
                }
            });
        }
    }, []);

    return (
        <div>
            <Header />
            <div className="max-w-screen-xl mx-auto min-h-[400px] flex flex-col justify-center items-center">
                <h1 className="font-semibold text-indigo-600 text-3xl">
                    {result ? result : "Có lỗi xảy ra."}
                </h1>
            </div>
            <Footers />
        </div>
    );
}

export default VerifyEmail;
