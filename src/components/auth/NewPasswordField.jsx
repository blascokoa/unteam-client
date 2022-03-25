import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

const NewPasswordField = (props) => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.changePassword(password, password2);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        required
        fullWidth
        type={"password"}
        id={"password"}
        autoComplete="password"
        variant={"outlined"}
        label={"Write your new Password"}
        sx={{ mt: 2 }}
        InputLabelProps={{
          style: { color: "#F54257" },
        }}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        color={"secondary"}
        value={password}
      />
      <TextField
        required
        fullWidth
        type={"password"}
        id={"password2"}
        autoComplete="password2"
        variant={"outlined"}
        label={"Repeat your password:"}
        InputLabelProps={{
          style: { color: "#F54257" },
        }}
        name="password"
        sx={{ mt: 2 }}
        onChange={(e) => setPassword2(e.target.value)}
        color={"secondary"}
        value={password2}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
        Submit Passwords
      </Button>
    </Box>
  );
};

export default NewPasswordField;
