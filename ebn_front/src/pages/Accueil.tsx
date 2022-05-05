import Header from "../components/Header";
import MainPoste from "../components/MainPoste";
import logo from "../assets/logo.png";
import Footer from "../components/Footer";
import Button from "@mui/material/Button";
import axios from 'axios';
import {HOST_BACK} from "../environment/environment";
import React, {useEffect} from "react";
import {useNavigate} from 'react-router-dom';

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
    }, [])

    function setSessionStorage(id: number, role: string) {
        if (role == "Client") {
            axios.get(HOST_BACK + `/client/` + id)
                .then(res => {
                    sessionStorage.setItem("id", res.data.id);
                    sessionStorage.setItem("role", res.data.utilisateur.role);
                    sessionStorage.setItem("name", res.data.utilisateur.prenom);
                    sessionStorage.setItem("lastname", res.data.utilisateur.name);
                    sessionStorage.setItem("commercialName", res.data.nomCommercial);
                    setTimeout(() => {
                        navigate("/client")
                    }, 100);
                })
        } else {
            axios.get(HOST_BACK + `/utilisateurs/` + id)
                .then(res => {
                    sessionStorage.setItem("id", res.data.id);
                    sessionStorage.setItem("role", res.data.role);
                    sessionStorage.setItem("name", res.data.prenom);
                    sessionStorage.setItem("lastname", res.data.name);
                    setTimeout(() => {
                        navigate("/admin")
                    }, 100);
                })
        }
    }

    return (
        <>
            <div className="logo">
                <img src={logo} alt="EBNlogo"/>
            </div>
            <div className="home">
                <Header sections={[]} title={""}/>
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

            <Button variant="contained" color="success" onClick={() =>
                setSessionStorage(1, "Admin")
            }>
                Section Admin
            </Button>
            <Button variant="contained" color="success" onClick={() =>
                setSessionStorage(1, "Client")
            }>
                Section Client
            </Button>


            <div className="footer">
                <Footer description={"Maquette pour EBN"} title={"Bienvenue"}/>
            </div>

        </>
    );
};

export default Accueil;
