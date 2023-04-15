import { Route, Routes } from "react-router-dom";
import NotFound from "../../components/common/NotFound";
import DashBoard from "./DashBoard";
import LayoutAdmin from "./layout/LayoutAdmin";
import UsersRoutes from "./users/UsersRoutes";
import DoctorSchedule from "./doctor/DoctorSchedule";
import ManageSpecialty from "./specialty/ManageSpecialty";
import SpecialtyAdd from "./specialty/SpecialtyAdd";
import SpecialtyEdit from "./specialty/SpecialtyEdit";
import ManageClinic from "./clinic/ManageClinic";
import ClinicAdd from "./clinic/ClinicAdd";
import ClinicEdit from "./clinic/ClinicEdit";

function RouteAdmin() {
    return (
        <Routes>
            <Route element={<LayoutAdmin />}>
                <Route index element={<DashBoard />} />
                <Route path={"users/*"} element={<UsersRoutes />} />
                <Route path={"schedule"} element={<DoctorSchedule />} />
                {/* specialty */}
                <Route path={"specialty"} element={<ManageSpecialty />} />
                <Route path={"specialty/add"} element={<SpecialtyAdd />} />
                <Route
                    path={"specialty/edit/:id"}
                    element={<SpecialtyEdit />}
                />
                {/* clinic */}
                <Route path={"clinic"} element={<ManageClinic />} />
                <Route path={"clinic/add"} element={<ClinicAdd />} />
                <Route path={"clinic/edit/:id"} element={<ClinicEdit />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default RouteAdmin;
