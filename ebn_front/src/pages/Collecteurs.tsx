import React from "react";

import Sidebar from "../components/Sidebar";
import CollecteursList from "../components/CollecteursList";
import RightSide from "../components/RightSide";

const Conteneurs = () => {
    return (
        <div className="App">
            <div className="AppGlass">
                <Sidebar />
                <CollecteursList />
                <RightSide />
            </div>
        </div>
    );
};

export default Conteneurs;