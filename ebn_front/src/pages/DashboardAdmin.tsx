import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ViewAdminDash from "../components/ViewAdminDash";
import ViewAdminRightSide from "../components/ViewAdminRightSide";
import { useNavigate } from "react-router-dom";
import { Button, Snackbar } from "@mui/material";

interface ramassageInterface {
  id: number;
  refDate: Date;
  Client: {
      id: number;
      adresse: string;
      Utilisateur:{
          nom: string;
          prenom: string;
      }
  };
  isSubscribe: boolean;
}

const DashboardAdmin = () => {
  const navigate = useNavigate();

  // séléction du composant central
  const [selectNav, setSelectNav] = useState("");
  // séléction du composant de droite
  const [selectRight, setSelectRight] = useState("");
  // passage de l'ID du conteneur de la liste centrale au QRcode situé à droite
  const [selectConteneurId, setSelectConteneurId] = useState("");
  //passage de l'ID Client de la liste centrale vers les formulaires
  const [selectClientId, setSelectClientId] = useState("");
  //passage de l'ID Collecteur de la liste centrale vers les formulaires
  const [selectCollecteurId, setSelectCollecteurId] = useState("");

  const [collectorEtape, setCollectorEtape]= useState([]);

  useEffect(() => {
    const sessionExp: any = sessionStorage.getItem("token_exp");
    const role: any = sessionStorage.getItem("role");
    if (!sessionStorage.getItem("role")) {
      navigate("/");
    }
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
     
<Snackbar

  message="Note archived"

/>
      <div className="AppGlass">
        <Sidebar setSelectNav={setSelectNav} setSelectRight={setSelectRight} />

        <ViewAdminDash
          selectNav={selectNav}
          selectConteneurId={selectConteneurId}
          setSelectConteneurId={setSelectConteneurId}
          setSelectClientId={setSelectClientId}
          selectClientId={selectClientId}
          setSelectCollecteurId={setSelectCollecteurId}
          selectCollecteurId={selectCollecteurId}
          setCollectorEtape={setCollectorEtape}
          collectorEtape={collectorEtape}
        />
        <ViewAdminRightSide
          selectRight={selectRight}
          selectConteneurId={selectConteneurId}
          collectorEtape={collectorEtape}
        />
  
      </div>
    </div>
  );
};

export default DashboardAdmin;
