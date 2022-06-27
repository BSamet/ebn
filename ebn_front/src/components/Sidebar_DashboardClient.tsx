import React, { useState } from "react";
import "../styles/component/Sidebar_DashboardClient.scss";
import { UilBars, UilSignOutAlt } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import Logo from "../assets/logo.png";
import { SidebarClientData } from "../Data/Data";
import { useNavigate } from "react-router-dom";

const SidebarDashboardClient = ({ setSelectNav, setSelectRight }: any) => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true);
  const clientvalide : any = sessionStorage.getItem("clientvalide");
    

  function onClickOnNav(index: number, heading: string) {
    setSelected(index);
    setSelectNav(heading);
    setSelectRight(heading);
  }

  function logOut() {
    sessionStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 100);
  }

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

<<<<<<< HEAD
  if (clientvalide == "true"){
    return (
      <>
        <div
          className="bars"
          style={expanded ? { left: "60%" } : { left: "5%" }}
          onClick={() => setExpaned(!expanded)}
        >
          <UilBars />
        </div>
        <motion.div
          className="_sidebar"
          variants={sidebarVariants}
          animate={window.innerWidth <= 768 ? `${expanded}` : ""}
        >
          {/* logo */}
          <div className="logo">
            <img src={Logo} alt="logo" />
=======
        <div className="menu">
          {SidebarClientData.map((item, index) => {
            return (
              <div
                className={selected === index ? "menuItem active" : "menuItem"}
                key={index}
                onClick={() => onClickOnNav(index, item.heading)}
              >
                <item.icon />
                <span>{item.heading}</span>
              </div>
            );
          })}
          <div className="menuItem" onClick={() => logOut()}>
            <UilSignOutAlt />
            <span>Déconnexion</span>
>>>>>>> d4178f0a1670307e16a38ceb39829092bb718202
          </div>
  
          <div className="menu">
            {SidebarClientData.map((item, index) => {
              return (
                <div
                  className={selected === index ? "menuItem active" : "menuItem"}
                  key={index}
                  onClick={() => onClickOnNav(index, item.heading)}
                >
                  <item.icon />
                  <span>{item.heading}</span>
                </div>
              );
            })}
            {/* signoutIcon */}
            <div className="menuItem" onClick={() => logOut()}>
              <UilSignOutAlt />
              <span>Déconnexion</span>
            </div>
          </div>
        </motion.div>
      </>
    );
  }

  
  else{
    return (
      <>
        <div
          className="bars"
          style={expanded ? { left: "60%" } : { left: "5%" }}
          onClick={() => setExpaned(!expanded)}
        >
          <UilBars />
        </div>
        <motion.div
          className="_sidebar"
          variants={sidebarVariants}
          animate={window.innerWidth <= 768 ? `${expanded}` : ""}
        >
          {/* logo */}
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>
  
          <div className="menu">
            {SidebarClientData.map((item, index) => {
              return (
                <div
                  className={selected === index ? "menuItem active" : "menuItem1"}
                  key={index}
                >
                  <item.icon />
                  <span>{item.heading}</span>
                </div>
              );
            })}
            {/* signoutIcon */}
            <div className="menuItem" onClick={() => logOut()}>
              <UilSignOutAlt />
              <span>Déconnexion</span>
            </div>
          </div>
        </motion.div>
      </>
    );

  }
 
}
export default SidebarDashboardClient;
