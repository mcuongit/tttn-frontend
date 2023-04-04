import { Navigate, Route, Routes } from "react-router-dom";
import MagangeDoctor from "../doctor/MagangeDoctor";
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
                <Route path="doctors" element={<MagangeDoctor />} />
                <Route path="*" element={<Navigate to="/notfound" />} />
            </Routes>
        </div>
    );
}

export default UsersRoutes;
