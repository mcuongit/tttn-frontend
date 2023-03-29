import { Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../utils/constant";

function NotFound() {
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate(-1);
    };
    return (
        <div className="flex flex-col justify-center items-center h-screen gap-3 bg-white">
            <h1 className="font-bold text-6xl">404</h1>
            <div className="text-2xl font-bold leading-tight">
                <span className="text-red-600">Opps! </span>Không tìm thấy
                trang.
            </div>
            <p className="text-gray-400">
                Trang bạn vừa truy cập không tồn tại.
            </p>
            <p className="mt-5 text-gray-500 text-sm">Thử truy cập</p>
            <div className="flex gap-x-3">
                <Button>
                    <HouseIcon />
                    <Link to={path.HOME}>Trang chủ</Link>
                </Button>
                <Button color="purple" onClick={handleOnClick}>
                    <ArrowLeft />
                    Quay lại trang trước đó
                </Button>
            </div>
        </div>
    );
}

const ArrowLeft = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 mr-2"
    >
        <path
            fillRule="evenodd"
            d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
            clipRule="evenodd"
        />
    </svg>
);

const HouseIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 mr-2"
    >
        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
    </svg>
);

export default NotFound;
