import React from "react";
import "../styles/component/_DashboardAdmin.scss";
import Sidebar from "../components/Sidebar";

const DashboardAdmin = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
