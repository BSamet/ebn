import Header from "../components/Header";
import MainPoste from "../components/MainPoste";
import logo from "../assets/logo.png";
import Footer from "../components/Footer";
import Button from "@mui/material/Button";

const Accueil = () => {
    return (
        <> <div className="logo">
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

            <a href="http://localhost:3000/Admin">
            <Button variant="contained" color="success">
                Section Admin
            </Button></a>
            <a href="http://localhost:3000/Client/1">
            <Button variant="contained" color="success">
                Section Client
            </Button></a>


            <div className="footer">
                <Footer description={"Maquette pour EBN"} title={"Bienvenue"} />
            </div>

        </>
    );
};

export default Accueil;
