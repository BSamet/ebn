import React, {useState} from "react";
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
  // passage de l'ID du conteneur de la liste centrale au QRcode sittué à droite
    const [selectConteneurId, setSelectConteneurId] = useState('');

  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar setSelectNav={setSelectNav} setSelectRight={setSelectRight}/>
        <ViewAdminDash selectNav={selectNav} selectConteneurId={selectConteneurId} setSelectConteneurId={setSelectConteneurId}/>
        <ViewAdminRightSide selectRight={selectRight} selectConteneurId={selectConteneurId}/>
      
      </div>

    </div>
  );
};

export default DashboardAdmin;
