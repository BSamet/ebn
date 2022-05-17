import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MainDash from "../components/MainDash";
import RightSide from "../components/RightSide";
import DashboardAdminHistory from "../components/DashboardAdminHistory";
import ViewAdminDash from "../components/ViewAdminDash";
import ViewAdminRightSide from "../components/ViewAdminRightSide";


const DashboardAdmin = () => {
  // séléction du composant central
  const [selectNav, setSelectNav] = useState('');
  // séléction du composant de droite
  const [selectRight, setSelectRight] = useState('');
  // passage de l'ID du conteneur de la liste centrale au QRcode situé à droite
  const [selectConteneurId, setSelectConteneurId] = useState('');
  //passage de l'ID Client de la liste centrale vers les formulaires
  const [selectClientId, setSelectClientId] = useState('');
  //passage de l'ID Collecteur de la liste centrale vers les formulaires
  const [selectCollecteurId, setSelectCollecteurId] = useState('')
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar setSelectNav={setSelectNav} setSelectRight={setSelectRight} />
        <ViewAdminDash 
          setSelectCollecteurId={undefined} selectNav={selectNav}
          selectConteneurId={selectConteneurId} setSelectConteneurId={setSelectConteneurId}
          setSelectClientId={setSelectClientId} selectClientId={selectClientId}
          {...setSelectCollecteurId} selectCollecteurId={selectCollecteurId}          />
        <ViewAdminRightSide selectRight={selectRight} selectConteneurId={selectConteneurId} />

      </div>

    </div>
  );
};

export default DashboardAdmin;
