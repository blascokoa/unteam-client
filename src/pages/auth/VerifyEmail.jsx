import { useNavigate } from "react-router-dom";
import { Button, Container, Paper, Typography } from "@mui/material";

const VerifyEmail = () => {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        variant={"outlined"}
        sx={{
          my: { xs: 2, md: 6 },
          p: { xs: 1, md: 4 },
        }}
      >
        <Typography variant={"h5"} sx={{ mb: 3 }}>
          We sent to your email a verification link, if you cannot find it,
          please search it on SPAM folder.
        </Typography>

        <Button
          onClick={() => navigate("/login")}
          fullWidth
          variant="contained"
          sx={{ mb: 2 }}
        >
          Submit request
        </Button>
      </Paper>
    </Container>
  );
};

export default VerifyEmail;
