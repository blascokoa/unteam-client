import { Link } from "react-router-dom";
import { Box, Grid } from "@mui/material";

const LandingPage = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      sx={{
        backgroundColor: "secondary.light",
        minHeight: "100vh",
      }}
    >
      <h1>Welcome to UnTeam</h1>
    </Grid>
  );
};

export default LandingPage;
