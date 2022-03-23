import { Container, Paper, Typography } from "@mui/material";

const NoMember = () => {
  return (
    <>
      <Container component={"main"} maxWidth={"sm"} sx={{ mb: 4 }}>
        <Paper
          variant={"outlined"}
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography variant={"h5"} align={"center"}>
            Sorry, no members yet.
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default NoMember;
