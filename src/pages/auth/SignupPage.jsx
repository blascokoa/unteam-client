import { useState } from "react";
import ClubSignupForm from "../../components/auth/ClubSignupForm";
import MemberSignupForm from "../../components/auth/MemberSignupForm";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

const SignupPage = () => {
  const [member, setMember] = useState(false);
  const [club, setClub] = useState(false);

  const isSelected = () => {
    return member || club;
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        variant={"outlined"}
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography variant={"h6"}>Welcome to UnTeam</Typography>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ mt: 1 }}>
          {!isSelected() && (
            <Button
              fullWidth
              variant="contained"
              onClick={() => setMember(!member)}
              sx={{ mb: 2 }}
            >
              Register as Member
            </Button>
          )}
          {!isSelected() && (
            <Button
              fullWidth
              variant="contained"
              onClick={() => setClub(!club)}
              sx={{ mb: 2 }}
            >
              Register as Club
            </Button>
          )}
          {member && <MemberSignupForm />}
          {club && <ClubSignupForm />}
        </Box>
      </Paper>
    </Container>
  );
};

export default SignupPage;
