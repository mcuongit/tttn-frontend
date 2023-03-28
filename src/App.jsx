import "./App.css";
import { path } from "./utils/constant";
import LayoutSite from "./container/layout/LayoutSite";
import HomePage from "./container/pages/HomePage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./components/common/NotFound";
import RouteAdmin from "./features/admin/RouteAdmin";
import Login from "./container/pages/Login";
import { Suspense } from "react";

function App() {
    const auth = JSON.parse(localStorage.getItem("persist:root"));
    const isLogin = auth.auth ? JSON.parse(auth.auth).isLogin : false;
    return (
        <Suspense fallback={null}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LayoutSite />}>
                        <Route index element={<HomePage />} />
                    </Route>
                    <Route
                        path={`${path.ADMIN}/*`}
                        element={
                            isLogin ? (
                                <RouteAdmin />
                            ) : (
                                <Navigate to={path.LOGIN} />
                            )
                        }
                    />
                    <Route path={path.LOGIN} element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
