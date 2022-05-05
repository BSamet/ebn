import React, {useState} from "react";
import Sidebar from "../components/Sidebar";
import MainDash from "../components/MainDash";
import RightSide from "../components/RightSide";
import DashboardAdminHistory from "../components/DashboardAdminHistory";
import ViewAdminDash from "../components/ViewAdminDash";
import ViewAdminRightSide from "../components/ViewAdminRightSide";


const DashboardAdmin = () => {
    const [selectNav, setSelectNav] = useState('');
    const [selectRight, setSelectRight] = useState('');


  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar setSelectNav={setSelectNav} setSelectRight={setSelectRight}/>
        <ViewAdminDash selectNav={selectNav} />
        <ViewAdminRightSide selectRight={selectRight}/>
      </div>

    </div>
  );
};

export default DashboardAdmin;
