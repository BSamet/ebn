import React from "react";

import Sidebar from "../components/Sidebar";
import ConteneursList from "../components/ConteneursList";
import RightSideQrcode from "../components/RightSideQrcode";

const Conteneurs = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <ConteneursList/>
        <RightSideQrcode/>
      </div>
    </div>
  );
};

export default Conteneurs;