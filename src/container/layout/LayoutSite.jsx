import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/common/Header";
import Footers from "../../components/common/Footers";

function LayoutSite() {
    return (
        <>
            <Header />
            <Outlet />
            <Footers />
        </>
    );
}

export default LayoutSite;
