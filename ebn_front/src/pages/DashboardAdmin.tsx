import React, {useState} from "react";
import Sidebar from "../components/Sidebar";
import MainDash from "../components/MainDash";
import RightSide from "../components/RightSide";
import DashboardAdminHistory from "../components/DashboardAdminHistory";
import ViewAdminDash from "../components/ViewAdminDash";

const DashboardAdmin = () => {
    const [selectNav, setSelectNav] = useState('');

  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <ViewAdminDash/>
        <RightSide/>
      </div>

    </div>
  );
};

export default DashboardAdmin;
