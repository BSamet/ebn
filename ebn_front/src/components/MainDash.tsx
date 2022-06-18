import React, { useEffect, useState } from "react";
import axios from "axios";
import { HOST_BACK } from "../environment/environment";
import { useParams } from "react-router-dom";
import moment from "moment";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Cards from "../components/Cards";
import StatCollectAdmin from "./StatCollectAdmin";
import RatioWasteCompost from "./RatioWasteCompost";
import GraphWeightPerHour from "./GraphWeightPerHour";

const MainDash = () => {
  const [hasClientValid, setHasClientValid] = useState(Boolean);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    
    axios.get(HOST_BACK + '/client/', {
      headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('token')}`}
      })
      .then((res) => {
        res.data.map((client: { clientvalide: boolean; })=>{
          if(client.clientvalide == false ){
            setHasClientValid(true) 
            setOpen(true);   
          }    
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

const handleClose = (
  event: React.SyntheticEvent | Event,
  reason?: string
) => {
  if (reason === "clickaway") {
    return;
  }
  setOpen(false);
};

const action = (
  <React.Fragment>
    <Button color="secondary" size="small" onClick={handleClose}>
      Fermer
    </Button>
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  </React.Fragment>
);

  return (
    <div className="MainDash">
      <h1>Tableau de bord</h1>
      <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Des clients sont en attente de validation"
        action={action}  
      />
    </div>
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
