import { Button } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { redirect } from "react-router-dom";
import { docTitle, path } from "../../utils/constant";
import { handleLogin } from "./slices/loginSlice";
import { saveUser } from "./slices/userSlice";

function DashBoard() {
    const dispatch = useDispatch();
    const handleST = () => {
        dispatch(handleLogin(false));
        dispatch(saveUser({}));
        return redirect(path.ADMIN);
    };
    useEffect(() => {
        const { dashboard } = docTitle.ADMIN;
        document.title = dashboard;
    }, []);

    return (
        <div>
            <p>DashBoard</p>
            <Button onClick={handleST}>Click</Button>
        </div>
    );
}

export default DashBoard;
