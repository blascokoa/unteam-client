import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService, verifyService } from "../../services/auth.services";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const LoginPage = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // ----------------------------------------------------------------
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value.toLowerCase());
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };

    try {
      const response = await loginService(user);
      const { authToken } = response.data;
      // recibir el token y guardarlo en localstorage

      localStorage.setItem("authToken", authToken);
      // redireccionar a "/dashboard"
      props.verifyUser();
      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        setErrorMessage(err.response.data.errorMessage);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      } else {
        navigate("/error");
      }
    }
  };

  useEffect(() => {
    if (props.isLoggedIn) {
      navigate("/dashboard");
    }
  }, [navigate, props.isLoggedIn]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            required
            fullWidth
            id="email"
            autoComplete="email"
            variant={"outlined"}
            margin={"normal"}
            label="Email Address"
            InputLabelProps={{
              style: { color: "#F54257" },
            }}
            name="email"
            onChange={handleEmailChange}
            color={"secondary"}
            value={email}
          />

          <TextField
            required
            fullWidth
            variant={"outlined"}
            margin={"normal"}
            InputLabelProps={{
              style: { color: "#F54257" },
            }}
            name="password"
            onChange={handlePasswordChange}
            color={"secondary"}
            value={password}
            type="password"
            label="Password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
        <Grid container>
          <Grid item xs>
            <Button
              onClick={() => navigate("/recover-password")}
              variant="text"
              size={"small"}
            >
              Forgot password?
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => navigate("/signup")}
              variant="text"
              size={"small"}
            >
              Don't have an account? Sign Up
            </Button>
          </Grid>
        </Grid>
        {showAlert && <Alert severity="error">{errorMessage}</Alert>}
      </Box>
    </Container>
  );
};

export default LoginPage;
