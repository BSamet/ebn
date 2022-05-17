<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> develop
import Sidebar from "../components/Sidebar";
import ViewAdminDash from "../components/ViewAdminDash";
import ViewAdminRightSide from "../components/ViewAdminRightSide";
import { useNavigate } from "react-router-dom";

const DashboardAdmin = () => {
  const navigate = useNavigate();

  // séléction du composant central
<<<<<<< HEAD
  const [selectNav, setSelectNav] = useState('');
  // séléction du composant de droite
  const [selectRight, setSelectRight] = useState('');
  // passage de l'ID du conteneur de la liste centrale au QRcode situé à droite
  const [selectConteneurId, setSelectConteneurId] = useState('');
  //passage de l'ID Client de la liste centrale vers les formulaires
  const [selectClientId, setSelectClientId] = useState('');
  //passage de l'ID Collecteur de la liste centrale vers les formulaires
  const [selectCollecteurId, setSelectCollecteurId] = useState('')
=======
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

>>>>>>> develop
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar setSelectNav={setSelectNav} setSelectRight={setSelectRight} />
<<<<<<< HEAD
        <ViewAdminDash 
          setSelectCollecteurId={undefined} selectNav={selectNav}
          selectConteneurId={selectConteneurId} setSelectConteneurId={setSelectConteneurId}
          setSelectClientId={setSelectClientId} selectClientId={selectClientId}
          {...setSelectCollecteurId} selectCollecteurId={selectCollecteurId}          />
        <ViewAdminRightSide selectRight={selectRight} selectConteneurId={selectConteneurId} />

=======
        <ViewAdminDash
          selectNav={selectNav}
          setSelectConteneurId={setSelectConteneurId}
        />
        <ViewAdminRightSide
          selectRight={selectRight}
          selectConteneurId={selectConteneurId}
        />
>>>>>>> develop
      </div>
    </div>
  );
};

export default DashboardAdmin;
