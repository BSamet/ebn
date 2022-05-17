import React from "react";

import Sidebar from "../components/Sidebar";
import ClientsList from "../components/ClientsList";
import RightSide from "../components/RightSide";

const Clients = () => {
    return (
        <div className="App">
            <div className="AppGlass">
                <Sidebar />
                <ClientsList />
                <RightSide />
            </div>
        </div>
    );
};

export default Clients;