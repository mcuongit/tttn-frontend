import "./App.css";
import { path } from "./utils/constant";
import LayoutSite from "./container/layout/LayoutSite";
import HomePage from "./container/pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./features/admin/DashBoard";
import LayoutAdmin from "./features/admin/layout/LayoutAdmin";
import NotFound from "./components/common/NotFound";
import UsersRoutes from "./features/admin/users/UsersRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={path.HOME} element={<LayoutSite />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path={path.ADMIN} element={<LayoutAdmin />}>
            <Route path={path.ADMIN} index element={<DashBoard />} />
            <Route path={`${path.ADMIN}/users/*`} element={<UsersRoutes />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
