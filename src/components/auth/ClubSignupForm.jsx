import { useEffect, useState } from "react";
import { signupClubService } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Button, Divider, TextField } from "@mui/material";

const ClubSignupForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  // ---------------------------------------------
  const [clubName, setClubName] = useState("");
  const [clubNIF, setClubNIF] = useState("");
  // ---------------------------------------------
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const club = {
      email,
      password,
      password2,
      clubName,
      clubNIF,
      role: "admin",
    };
    try {
      await signupClubService(club);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate("/signup/verify");
      }, 5000);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
        setShowErrorMessage(true);
        setTimeout(() => {
          setShowErrorMessage(false);
        }, 5000);
      } else {
        navigate("/error");
      }
    }
  };

  const enabledIfFilled = () => {
    return !email || !password || !password2 || !clubName || !clubNIF;
  };

  return (
    <div>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          required
          fullWidth
          type={"email"}
          id={"email"}
          autoComplete="email"
          variant={"filled"}
          label={"Please write your email:"}
          InputLabelProps={{
            style: { color: "#F54257" },
          }}
          name="email"
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          color={"secondary"}
          value={email}
          sx={{ mb: 1 }}
        />

        <TextField
          required
          fullWidth
          type={"password"}
          id={"password"}
          autoComplete="password"
          variant={"filled"}
          label={"Password"}
          InputLabelProps={{
            style: { color: "#F54257" },
          }}
          name="email"
          onChange={(e) => setPassword(e.target.value)}
          color={"secondary"}
          value={password}
          sx={{ mb: 1 }}
        />

        <TextField
          required
          fullWidth
          type={"password"}
          id={"password2"}
          autoComplete="password"
          variant={"filled"}
          label={"Repeat Password"}
          InputLabelProps={{
            style: { color: "#F54257" },
          }}
          name="email"
          onChange={(e) => setPassword2(e.target.value)}
          color={"secondary"}
          value={password2}
          sx={{ mb: 2 }}
        />
        <Divider sx={{ mb: 2 }} />
        <TextField
          required
          fullWidth
          type={"text"}
          id={"clubName"}
          autoComplete="clubName"
          variant={"filled"}
          label={"Club Name"}
          InputLabelProps={{
            style: { color: "#F54257" },
          }}
          name="clubName"
          onChange={(e) => setClubName(e.target.value)}
          color={"secondary"}
          value={clubName}
          sx={{ mb: 2 }}
        />

        <TextField
          required
          fullWidth
          type={"text"}
          id={"clubNIF"}
          autoComplete="clubNIF"
          variant={"filled"}
          label={"Club NIF"}
          InputLabelProps={{
            style: { color: "#F54257" },
          }}
          name="clubNIF"
          onChange={(e) => setClubNIF(e.target.value)}
          color={"secondary"}
          value={clubNIF}
          sx={{ mb: 2 }}
        />
        <Divider sx={{ mb: 2 }} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={enabledIfFilled()}
        >
          Register
        </Button>
      </Box>
      {showErrorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {showSuccessMessage && (
        <Alert severity="success" sx={{ textAlign: "center" }}>
          <strong>Register completed!</strong>
          <br />
          You will be redirected in 5 seconds
        </Alert>
      )}
    </div>
  );
};

export default ClubSignupForm;
