import "./App.css";
import { path } from "./utils/constant";
import LayoutSite from "./container/layout/LayoutSite";
import HomePage from "./container/pages/HomePage";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NotFound from "./components/common/NotFound";
import RouteAdmin from "./admin/RouteAdmin";
import Login from "./container/pages/Login";
import { Suspense } from "react";
import DetailDoctor from "./container/patient/doctor/DetailDoctor";
import VerifyEmail from "./container/patient/VerifyEmail";
import DetailSpecilaty from "./container/patient/specialty/DetailSpecilaty";
import DetailClinic from "./container/patient/clinic/DetailClinic";
import BookingSuccess from "./container/patient/BookingSuccess";
import ListItem from "./container/pages/ListItem";
import Category from "./container/patient/category/Category";
import Post from "./container/patient/post/Post";
import PostDetail from "./container/patient/post/PostDetail";
import ScrollToTop from "./components/common/ScrollToTop";
import CategoryDetail from "./container/patient/category/CategoryDetail";
import About from "./container/pages/About";
import PrivateRoute from "./admin/PrivateRoute";
import { history } from "./utils/history";

function App() {
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <Suspense fallback={null}>
      <ScrollToTop>
        <Routes>
          <Route path={path.HOME} element={<LayoutSite />}>
            <Route index element={<HomePage />} />
            <Route path={path.DETAIL_DOCTOR} element={<DetailDoctor />} />
            <Route path={path.DETAIL_SPECIALTY} element={<DetailSpecilaty />} />
            <Route path={path.DETAIL_CLINIC} element={<DetailClinic />} />
            <Route path={path.VERIFY_EMAIL} element={<VerifyEmail />} />
            <Route path={"booking/success"} element={<BookingSuccess />} />
            <Route path={"listItem"} element={<ListItem />} />
            <Route path={"post-detail/:id"} element={<PostDetail />} />
            <Route path={"post/category"} element={<Category />} />
            <Route path={"post"} element={<Post />} />
            <Route path={"post/cat/:slug"} element={<CategoryDetail />} />
            <Route path={"about"} element={<About />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path={`${path.ADMIN}/*`} element={<RouteAdmin />} />
          </Route>
          <Route path={path.LOGIN} element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ScrollToTop>
    </Suspense>
  );
}

export default App;
