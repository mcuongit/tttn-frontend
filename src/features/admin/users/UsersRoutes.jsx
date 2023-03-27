import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../../../components/common/NotFound";
import UserAdd from "./UserAdd";
import UserEdit from "./UserEdit";
import UsersManage from "./UsersManage";

function UsersRoutes() {
    return (
        <div>
            <Routes>
                <Route path="manage" element={<UsersManage />} />
                <Route path="add" element={<UserAdd />} />
                <Route path="edit/:id" element={<UserEdit />} />
            </Routes>
        </div>
    );
}

export default UsersRoutes;
