import { useState } from "react";
import {
  newPasswordService,
  recoverPasswordService,
} from "../../services/auth.services";
import RecoverPasswordField from "../../components/auth/RecoverPasswordField";
import { useNavigate } from "react-router-dom";
import NewPasswordField from "../../components/auth/NewPasswordField";
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";

const RecoverPasswordPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [showCodeField, setShowCodeField] = useState(false);
  const [showNewPasswordForm, setNewPasswordForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = { email };
      const showCodeFieldResult = await recoverPasswordService(user);
      setShowCodeField(showCodeFieldResult);
      console.log(showCodeField);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
        setShowErrorMessage(true);
        setTimeout(() => {
          setShowErrorMessage(false);
        }, 5000);
      } else {
        navigate("/error");
      }
    }
  };

  const handlePasswordForm = (result) => {
    if (result) {
      setShowCodeField(false);
      setNewPasswordForm(true);
    }
  };

  const changePassword = async (pwd1, pwd2) => {
    try {
      const data = { email, pwd1, pwd2 };
      const result = await newPasswordService(data);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        result && navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
        setShowErrorMessage(true);
        setTimeout(() => {
          setShowErrorMessage(false);
        }, 5000);
      } else {
        navigate("/error");
      }
    }
  };

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
          Pasword Recovery
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            required
            fullWidth
            type={"email"}
            id={"email"}
            autoComplete="email"
            variant={"outlined"}
            label={"Your email address"}
            disabled={showCodeField || showNewPasswordForm}
            InputLabelProps={{
              style: { color: "#F54257" },
            }}
            name="email"
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            color={"secondary"}
            value={email}
          />
          {!showCodeField && !showNewPasswordForm && (
            <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
              Submit request
            </Button>
          )}
        </Box>
        <Box>
          {showCodeField && (
            <RecoverPasswordField
              handlePasswordForm={handlePasswordForm}
              showNewPasswordForm={showNewPasswordForm}
            />
          )}
        </Box>
        <Box>
          {showNewPasswordForm && (
            <NewPasswordField changePassword={changePassword} />
          )}
        </Box>
        <Box>
          {showErrorMessage && <Alert severity="error">{errorMessage}</Alert>}
          {showSuccessMessage && (
            <Alert severity="success" sx={{ textAlign: "center" }}>
              <strong>Password changed!</strong>
              <br />
              You will be redirected to login page in 5 seconds
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default RecoverPasswordPage;
