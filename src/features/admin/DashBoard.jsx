import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "./slices/loginSlice";

function DashBoard() {
    const handleST = () => {
        dispatch(handleLogin(true));
        console.log("dispatch:", login);
    };
    return (
        <div>
            <p>DashBoard</p>
            <Button onClick={handleST}>Click</Button>
        </div>
    );
}

export default DashBoard;
