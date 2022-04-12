import Header from "../components/Header";
import MainPoste from "../components/MainPoste";
import logo from "../assets/logo.jpg";

const Accueil = () => {
  return (
    <>
      <div className="home">
        <Header sections={[]} title={"Les Tisserands D'EBN"} />
      </div>
      <div className="logo">
      <img src={logo} alt="EBNlogo"/>
      </div>
      <div className="mainPost">
        <MainPoste
          post={{
            description: "Bienvenue sur le site EBN",
            image:
              "http://localhost:3000/static/media/LogoLogin.d9f933c3c6bb7e2e0311.jpg",
            imageText: "test",
            linkText: "",
            title: "Venez nous découvrir",
          }}
        />
      </div>
    </>
  );
};

export default Accueil;
