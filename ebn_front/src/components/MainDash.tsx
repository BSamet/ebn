import React from "react";
import Cards from "../components/Cards";
import StatCollectAdmin from "./StatCollectAdmin";
import RatioWasteCompost from "./RatioWasteCompost";
import GraphWeightPerHour from "./GraphWeightPerHour";

const MainDash = () => {
  return (
    <div className="MainDash">
      <h1>Tableau de bord</h1>
      <Cards />

      <div className="MainDash__bioStat">
        <StatCollectAdmin />
        <RatioWasteCompost />
      </div>
      <div className="MainDash__graph">
        <GraphWeightPerHour />
      </div>
    </div>
  );
};

export default MainDash;
