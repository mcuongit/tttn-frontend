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
                <span className="text-red-600">Opps! </span>Page not found.
            </div>
            <p className="text-gray-400">
                The page you are looking for doesn't exist.
            </p>
            <div className="mt-5 flex gap-x-3">
                <Button>
                    <Link to={path.HOME}>Home Page</Link>
                </Button>
                <Button color="purple" onClick={handleOnClick}>
                    Go previous page
                </Button>
            </div>
        </div>
    );
}

export default NotFound;
