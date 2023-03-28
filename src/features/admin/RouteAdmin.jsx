import { Route, Routes } from "react-router-dom";
import DashBoard from "./DashBoard";
import LayoutAdmin from "./layout/LayoutAdmin";
import UsersRoutes from "./users/UsersRoutes";

function RouteAdmin() {
    return (
        <Routes>
            <Route element={<LayoutAdmin />}>
                <Route index element={<DashBoard />} />
                <Route path={"users/*"} element={<UsersRoutes />} />
            </Route>
        </Routes>
    );
}

export default RouteAdmin;
