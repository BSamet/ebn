import React from "react";
import "../styles/component/_DashboardAdmin.scss";
import Sidebar from "../components/Sidebar";
import MainDash from "../components/MainDash";

const DashboardAdmin = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <MainDash/>

      </div>
    </div>
  );
};

export default DashboardAdmin;
