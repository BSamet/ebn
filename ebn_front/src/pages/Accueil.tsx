import Header from "../components/Header";
import MainPoste from "../components/MainPoste";
import logo from "../assets/logo.png";
import Footer from "../components/Footer";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UpdateClient from "../components/UpdateClient";

const Accueil = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("role") == "Client") {
      navigate("/client");
    } else if (sessionStorage.getItem("role") == "Admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="logo">
        <img src={logo} alt="EBNlogo" />
      </div>
      <div className="home">
        <Header sections={[]} title={""} />
      </div>

      <div className="mainPost">
        <MainPoste
          post={{
            description: "Bienvenue sur le site EBN",
            image:
              "https://cdn.radiofrance.fr/s3/cruiser-production/2021/08/129500c2-4aab-4f85-9e26-77817b63c827/1136_ecologie-rechauffement-climatique-changement.jpg",
            imageText: "test",
            linkText: "",
            title: "Venez nous découvrir",
          }}
        />
      </div>
      <div className="footer">
        <Footer description={"EBN"} title={"Bienvenue"} />
      </div>
    </>
  );
};

export default Accueil;
