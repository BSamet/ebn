import React from "react";
import "../styles/component/_DashboardAdmin.scss";
import Sidebar from "../components/Sidebar";
import QrCodeGen from "../components/QrCodeGen";
import RightSide from "../components/RightSide";

const AdminQRcodeGen = () => {
    return (
        <div className="App">
            <div className="AppGlass">
                <Sidebar />
                <QrCodeGen />
                <RightSide />

            </div>
        </div>
    );
};

export default AdminQRcodeGen;