import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signupClubService,
  signupMemberService,
} from "../../services/auth.services";
import { Alert, Box, Button, Divider, TextField } from "@mui/material";

const MemberSignupForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  // ---------------------------------------------
  const [clubCode, setClubCode] = useState("");
  // ---------------------------------------------
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { email, password, password2, clubCode, role: "member" };
    try {
      await signupMemberService(user);
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
    return !email || !password || !password2 || !clubCode;
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
          id={"code"}
          autoComplete="code"
          variant={"filled"}
          label={"Club Code"}
          InputLabelProps={{
            style: { color: "#F54257" },
          }}
          name="code"
          onChange={(e) => setClubCode(e.target.value.toUpperCase())}
          color={"secondary"}
          value={clubCode}
          sx={{ mb: 1 }}
        />

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

export default MemberSignupForm;
