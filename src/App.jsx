import "./App.css";
import { path } from "./utils/constant";
import LayoutSite from "./container/layout/LayoutSite";
import HomePage from "./container/pages/HomePage";
import {
    BrowserRouter,
    Navigate,
    redirect,
    Route,
    Routes,
} from "react-router-dom";
import NotFound from "./components/common/NotFound";
import RouteAdmin from "./features/admin/RouteAdmin";
import Login from "./container/pages/Login";
import { Suspense } from "react";
import { useSelector } from "react-redux";

function App() {
    const selector = useSelector((state) => state.auth.isLogin);
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
                            selector ? (
                                <RouteAdmin />
                            ) : (
                                <Navigate to={path.LOGIN} replace={true} />
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
