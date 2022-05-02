import React from "react";
import Sidebar from "../components/Sidebar";
import MainDash from "../components/MainDash";
import RightSide from "../components/RightSide";
import DashboardAdminHistory from "../components/DashboardAdminHistory";

const DashboardAdmin = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <MainDash/>
        <RightSide/>
      </div>
        <DashboardAdminHistory/>
    </div>
  );
};

export default DashboardAdmin;
