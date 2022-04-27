import React from "react";

import Sidebar from "../components/Sidebar";
import MainDash from "../components/MainDash";
import RightSide from "../components/RightSide";

const DashboardAdmin = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <MainDash/>
        <RightSide/>

      </div>
    </div>
  );
};

export default DashboardAdmin;
