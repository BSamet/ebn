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
import CircularProgress from "@mui/material/CircularProgress";
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

  const [isSignupLoading, setIsSignupLoading] = useState(true);

  const [errorRequest, setErrorRequest] = useState(false);

  const [errorPhone, setErrorPhone] = useState({
    error: false,
    errorMessage: "",
  });

  const [errorMail, setErrorMail] = useState({
    error: false,
    errorMessage: "",
  });
  const [errorConfirmMail, setErrorConfirmMail] = useState({
    error: false,
    errorMessage: "",
  });
  const [errorPassword, setErrorPassword] = useState({
    error: false,
    errorMessage:
      "Doit contenir minuscule, majuscule, chiffre, caractère spéciale !",
  });
  const [errorConfirmPassword, setErrorConfirmPassword] = useState({
    error: false,
    errorMessage: "",
  });
  let emailEntered: any

  async function isEmailDuplicated(email: string){
    emailEntered = await axios
                              .get(HOST_BACK + "/utilisateurs/email/" + email)
                              .then((res) => {
                                if(res.data.mail == email){
                                  return res.data.mail;
                                } else {
                                  return "";
                                }
                              }) 
  }

  function validatePhone(phone: string) {
    const pattern = /^((\+)33|0)[1-9](\d{2}){4}$/g;
    return pattern.test(phone);
  }

  function validateEmail(email: string) {
    const pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    return pattern.test(email);
  }

  function validatePassword(password: string) {
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/g;
    return pattern.test(password);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let send = true;
    const data = new FormData(event.currentTarget);
    let lastName: string = data.get("lastName");
    let name: string = data.get("name");
    let commercialName: string = data.get("commercialName");
    let adresse: string = data.get("adresse");
    let phone: string = data.get("phone");
    let mail: string = data.get("mail");
    let confirmMail: string = data.get("confirmMail");
    let password: string = data.get("password");
    let confirmPassword: string = data.get("confirmPassword");

    if (!validatePhone(phone)) {
      send = false;
      setErrorPhone({
        error: true,
        errorMessage: "Veuillez entrez un numéro de téléphone valide.",
      });
    } else {
      setErrorPhone({
        error: false,
        errorMessage: "",
      });
    }

    if (!validateEmail(mail)) {
      send = false;
      setErrorMail({
        error: true,
        errorMessage: "Veuillez entrez une adresse email valide.",
      });
    } else {
      setErrorMail({
        error: false,
        errorMessage: "",
      });
    }

    await isEmailDuplicated(mail)

    if(emailEntered == mail) {
      send = false;
      setErrorMail({
        error: true,
        errorMessage: "Cette adresse mail est déjà utilisée",
      });
    } else {
      setErrorMail({
        error: false,
        errorMessage: "",
      });
    }

    if (mail !== confirmMail) {
      send = false;
      setErrorConfirmMail({
        error: true,
        errorMessage: "Les adresse email ne correspondent pas.",
      });
    } else {
      setErrorConfirmMail({
        error: false,
        errorMessage: "",
      });
    }

    if (!validatePassword(password)) {
      send = false;
      setErrorPassword({
        error: true,
        errorMessage:
          "Doit contenir minuscule, majuscule, chiffre, caractère spéciale !",
      });
    } else {
      setErrorPassword({
        error: false,
        errorMessage:
          "Doit contenir minuscule, majuscule, chiffre, caractère spéciale !",
      });
    }

    if (password !== confirmPassword) {
      send = false;
      setErrorConfirmPassword({
        error: true,
        errorMessage: "Les mot de passe ne correspondent pas.",
      });
    } else {
      setErrorConfirmPassword({
        error: false,
        errorMessage: "",
      });
    }

    if (send) {
      setIsSignupLoading(false);
      axios
        .post(HOST_BACK + "/client", {
          nom: lastName,
          prenom: name,
          mail: mail,
          telephone: phone,
          password: password,
          nomCommercial: commercialName,
          adresse: adresse,
          headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
          }
        })
        .then((res) => {
          setTimeout(() => {
            navigate("/Connection");
          }, 1500);
          
        })
        .catch((err) => {
          setErrorRequest(true);
        });
    }
  };

  if (isSignupLoading) {
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
        <Grid container component="main" sx={{ height: "100vh" }}>
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
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
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
                Inscrivez vous
              </Typography>
              {errorRequest && (
                <div className="errorRequestClass">
                  Une erreur c'est produite
                </div>
              )}
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="lastName"
                      required
                      id="lastName"
                      label="Nom"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      label="Prénom"
                      name="name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="commercialName"
                      label="Société"
                      name="commercialName"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="adresse"
                      label="Adresse"
                      name="adresse"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={errorPhone.error}
                      helperText={errorPhone.errorMessage}
                      required
                      fullWidth
                      id="phone"
                      label="Téléphone"
                      name="phone"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={errorMail.error}
                      helperText={errorMail.errorMessage}
                      required
                      fullWidth
                      id="mail"
                      label="Adresse Email"
                      name="mail"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={errorConfirmMail.error}
                      helperText={errorConfirmMail.errorMessage}
                      required
                      fullWidth
                      id="confirmMail"
                      label="Confirmer votre adresse Email"
                      name="confirmMail"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={errorPassword.error}
                      helperText={errorPassword.errorMessage}
                      required
                      fullWidth
                      name="password"
                      label="Mot de passe"
                      type="password"
                      id="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={errorConfirmPassword.error}
                      helperText={errorConfirmPassword.errorMessage}
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirmation du mot de passe"
                      type="password"
                      id="confirmPassword"
                    />
                  </Grid>
                  <Grid item xs={12}></Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Inscription
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/Connection" variant="body2">
                      {"Avez vous déjà un compte ? Connectez vous !"}
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
  } else {
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
        <Grid container component="main" sx={{ height: "100vh" }}>
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
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            {errorRequest && (
              <div className="errorRequestClass">
                Une erreur c'est produite !
              </div>
            )}
            <div className="isSignupLoading">
              <div>
              <p>Merci pour votre inscription, un administrateur vas valider votre compte</p>
              </div>
              <div>
              <CircularProgress size={75} />
              </div>
            </div>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}
