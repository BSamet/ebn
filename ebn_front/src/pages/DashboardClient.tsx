import React, { useEffect } from "react";
import "../styles/component/_DashboardClient.scss";
import Sidebar_DashboardClient from "../components/Sidebar_DashboardClient";
import MainDashClient from "../components/MainDashClient";
import RightSideClient from "../components/RightSideClient";
import { useNavigate } from "react-router-dom";

const DashboardClient = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const sessionExp: any = sessionStorage.getItem("token_exp");
    const role: any = sessionStorage.getItem("role");
   
    
      if (!sessionStorage.getItem("role")) {
        navigate("/");
      } else if (role !== "Client") {
        navigate("/admin");
      } else if (sessionExp * 1000 < Date.now()) {
        sessionStorage.clear();
        setTimeout(() => {
          navigate("/");
        }, 100);
      }

   
    
  });
 

  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar_DashboardClient />
        <MainDashClient />
        <RightSideClient />
      </div>
    </div>
  );
};

export default DashboardClient;
