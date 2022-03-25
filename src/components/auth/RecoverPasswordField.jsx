import { useState } from "react";
import { checkCodeRecoverPassword } from "../../services/auth.services";
import { Alert, Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RecoverPasswordField = (props) => {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const { showNewPasswordForm } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const verifyCodeResult = await checkCodeRecoverPassword(code);
      console.log(verifyCodeResult);
      props.handlePasswordForm(verifyCodeResult);
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
    <div>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          required
          fullWidth
          type={"email"}
          id={"code"}
          autoComplete="code"
          variant={"outlined"}
          label={"Write your restoration code:"}
          disabled={showNewPasswordForm}
          InputLabelProps={{
            style: { color: "#F54257" },
          }}
          name="code"
          onChange={(e) => setCode(e.target.value)}
          color={"secondary"}
          value={code}
        />
        {!showNewPasswordForm && (
          <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
            Submit request
          </Button>
        )}
        {showErrorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Box>
    </div>
  );
};

export default RecoverPasswordField;
