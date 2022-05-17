import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ViewAdminDash from "../components/ViewAdminDash";
import ViewAdminRightSide from "../components/ViewAdminRightSide";
import { useNavigate } from "react-router-dom";

const DashboardAdmin = () => {
  const navigate = useNavigate();

  // séléction du composant central
  const [selectNav, setSelectNav] = useState("");
  // séléction du composant de droite
  const [selectRight, setSelectRight] = useState("");
  // passage de l'ID du conteneur de la liste centrale au QRcode sittué à droite
  const [selectConteneurId, setSelectConteneurId] = useState("");

  useEffect(() => {
    const sessionExp: any = sessionStorage.getItem("token_exp");
    const role: any = sessionStorage.getItem("role");
    if (role !== "Admin") {
      navigate("/client");
    }
    if (sessionExp * 1000 < Date.now()) {
      sessionStorage.clear();
      setTimeout(() => {
        navigate("/");
      }, 100);
    }
  });

  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar setSelectNav={setSelectNav} setSelectRight={setSelectRight} />
        <ViewAdminDash
          selectNav={selectNav}
          setSelectConteneurId={setSelectConteneurId}
        />
        <ViewAdminRightSide
          selectRight={selectRight}
          selectConteneurId={selectConteneurId}
        />
      </div>
    </div>
  );
};

export default DashboardAdmin;
