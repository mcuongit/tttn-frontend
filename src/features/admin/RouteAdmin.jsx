import { Route, Routes } from "react-router-dom";
import NotFound from "../../components/common/NotFound";
import DashBoard from "./DashBoard";
import LayoutAdmin from "./layout/LayoutAdmin";
import UsersRoutes from "./users/UsersRoutes";
import DoctorSchedule from "./doctor/DoctorSchedule";

function RouteAdmin() {
    return (
        <Routes>
            <Route element={<LayoutAdmin />}>
                <Route index element={<DashBoard />} />
                <Route path={"users/*"} element={<UsersRoutes />} />
                <Route path={"schedule"} element={<DoctorSchedule />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default RouteAdmin;
