import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { HOST_BACK } from "../environment/environment";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        EBN
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();
  const [errorRequest, setErrorRequest] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  function logIn() {
    axios
      .post(HOST_BACK + "/utilisateurs/login", {
        mail: mail,
        password: password,
      })
      .then((res) => {
        const decode: any = jwt_decode(res.data.access_token);
        if(decode.utilisateur.role === "Collecteur"){
          console.log("vous êtes un collecteur");
          
        } else {
          sessionStorage.setItem("role", decode.utilisateur.role);
        sessionStorage.setItem("name", decode.utilisateur.nom);
        sessionStorage.setItem("lastname", decode.utilisateur.lastname);
        sessionStorage.setItem("token", res.data.access_token);
        sessionStorage.setItem("token_exp", decode.exp);
        if (decode.utilisateur.role === "Admin") {
          sessionStorage.setItem("id", decode.utilisateur.id);
        } else if (decode.utilisateur.role === "Client") {
          axios
            .post(
              HOST_BACK + "/client/mail",
              { mail: decode.utilisateur.mail },
              {
                headers: {
                  Authorization: `Bearer ${res.data.access_token}`,
                },
              }
            )
            .then((res) => {
              sessionStorage.setItem("id", res.data.id);
              sessionStorage.setItem("clientvalide", res.data.clientvalide);
              console.log(res.data);
              
            });
        }
        else{
          return null
        }
        setTimeout(() => {
          if (decode.utilisateur.role === "Admin") {
            navigate("/admin");
          } else if (decode.utilisateur.role === "Client") {
            navigate("/client");
          }
          else {
            navigate("/")
          }
        }, 100);
        }
      })
      .catch((err) => {
        setErrorRequest(true);
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="returnButton">
        <Link href="/">
          <Fab variant="extended">
            <ArrowBackIcon sx={{ mr: 1 }} />
            Retour
          </Fab>
        </Link>
      </div>
      <Grid container component="main" sx={{height: "100vh"}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(http://195.154.170.113/background-ebn.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#0096f0" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Connectez vous
            </Typography>
            {errorRequest && (
              <div className="errorRequestClass">
                Une erreur c'est produite !
              </div>
            )}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adresse email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setMail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={logIn}
              >
                connexion
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/Inscription" variant="body2">
                    {"Pas encore chez nous ? Inscrivez vous !"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
