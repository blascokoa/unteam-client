import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { useEffect, useState } from "react";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import RecoverPasswordPage from "./pages/auth/RecoverPasswordPage";
import VerifyEmail from "./pages/auth/VerifyEmail";
import NavBar from "./components/NavBar";
import { verifyService } from "./services/auth.services";
import ConfirmEmail from "./pages/auth/ConfirmEmail";
import { Box } from "@mui/material";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Error from "./pages/Error";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");
  const [fetchingUser, setFetchingUser] = useState(true);

  // TODO Add useEffect with VerityUser using verifyService
  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {
    // conectar con el server y validar el token
    try {
      // con esto tengo la informacion del usuario loggeado, pasarlo como prop a los componentes requeridos.
      const response = await verifyService();
      setLoggedUser(response.data);
      // cambiar el isLoggedIn state a true
      setIsLoggedIn(true);
    } catch (err) {
      setIsLoggedIn(false);
    } finally {
      setFetchingUser(false);
    }
  };

  if (fetchingUser) {
    return <h3>Loading</h3>;
  }

  return (
    <Box className="App">
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route
          path={"/login"}
          element={
            <LoginPage isLoggedIn={isLoggedIn} verifyUser={verifyUser} />
          }
        />
        <Route path={"/contact"} element={<Contact />} />
        <Route path={"/signup"} element={<SignupPage />} />
        <Route path={"/signup/verify"} element={<VerifyEmail />} />
        <Route path={"/recover-password"} element={<RecoverPasswordPage />} />
        <Route
          path={"/signup/confirm-email/:code"}
          element={<ConfirmEmail />}
        />
        <Route
          path={"/dashboard"}
          element={
            <Dashboard loggedUser={loggedUser} isLoggedIn={isLoggedIn} />
          }
        />
        <Route path={"/*"} element={<Error />} />
      </Routes>
    </Box>
  );
}

export default App;
