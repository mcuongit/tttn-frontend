import React from "react";
import { Outlet } from "react-router-dom";

function LayoutSite() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default LayoutSite;
