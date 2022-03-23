import { useState } from "react";
import ClubSignupForm from "../../components/auth/ClubSignupForm";
import MemberSignupForm from "../../components/auth/MemberSignupForm";
import { Box } from "@mui/material";

const SignupPage = () => {
  const [member, setMember] = useState(false);
  const [club, setClub] = useState(false);

  const isSelected = () => {
    return member || club;
  };

  return (
    <Box>
      {!isSelected() && (
        <button onClick={() => setMember(!member)}>Register as Member</button>
      )}
      {!isSelected() && (
        <button onClick={() => setClub(!club)}>Register as Club</button>
      )}
      {member && <MemberSignupForm />}
      {club && <ClubSignupForm />}
    </Box>
  );
};

export default SignupPage;
