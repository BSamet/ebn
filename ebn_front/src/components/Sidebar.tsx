import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { UilBars, UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { motion } from "framer-motion";
import {useNavigate} from "react-router-dom";

const Sidebar = ({setSelectNav, setSelectRight}:any) => {

  const navigate = useNavigate();

  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true);


  function onClickOnNav(index:number, heading:string) {
    setSelected(index);
    setSelectNav(heading);
    setSelectRight(heading);
  }
  function logOut() {
    sessionStorage.clear();
    setTimeout(() => {
      navigate("/")
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
  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() =>setExpaned(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        <div className="logo">

          <img src={Logo} alt="logo" onClick={() => onClickOnNav(0, "Tableau de bord") }/>

        </div>

        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <div
                className={selected === index ? "menuItem active" : "menuItem"}
                key={index}
                onClick={() => onClickOnNav(index, item.heading) }
              >
                <item.icon />
                <span>{item.heading}</span>
              </div>
            );
          })}



          {/* signoutIcon */}
          <div className="menuItem"
               onClick={() =>
                   logOut()
          }>
            <UilSignOutAlt />
            <span>Déconnexion</span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
