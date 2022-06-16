import React, { useEffect } from "react";
import "../styles/component/_DashboardClient.scss";
import Sidebar_DashboardClient from "../components/Sidebar_DashboardClient";
import MainDashClient from "../components/MainDashClient";
import RightSideClient from "../components/RightSideClient";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DashboardClient = () => {
  const navigate = useNavigate();
  const [selectNav, setSelectNav] = useState("");
  // passage de l'ID du conteneur de la liste centrale au QRcode situé à droite
  const [selectConteneurId, setSelectConteneurId] = useState("");
  //passage de l'ID Client de la liste centrale vers les formulaires
  const [selectClientId, setSelectClientId] = useState("");
  //passage de l'ID Collecteur de la liste centrale vers les formulaires
  const [selectCollecteurId, setSelectCollecteurId] = useState("");


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
        <Sidebar_DashboardClient setSelectNav={setSelectNav} />
        <MainDashClient 
          selectNav={selectNav}
          selectConteneurId={selectConteneurId}
          setSelectConteneurId={setSelectConteneurId}
          setSelectClientId={setSelectClientId}
          selectClientId={selectClientId}
          setSelectCollecteurId={setSelectCollecteurId}
          selectCollecteurId={selectCollecteurId}
        />
        <RightSideClient />
      </div>
    </div>
  );
};

export default DashboardClient;
