import {
  Box,
  Button,
  Collapse,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import { useState } from "react";
import AddMemberForm from "./AddMemberForm";

const AddMember = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    setShowForm(!showForm);
  };

  const handleClickSave = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log("Inside Save Button");
  };

  return (
    <Container component={"main"} maxWidth={"sm"} sx={{ mb: 4 }}>
      <Paper
        variant={"outlined"}
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Collapse in={showForm}>
          <AddMemberForm setFormData={setFormData} />
        </Collapse>
        <Grid container spacing={2}>
          <Grid item xs={showForm ? 6 : 12}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant={showForm ? "outlined" : "contained"}
                onClick={handleClick}
                sx={{ mt: 0, ml: 1, display: "flex" }}
                fullWidth
              >
                {showForm ? "Cancel" : "Add a new member"}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={showForm ? 6 : 12}>
            <Box
              sx={{
                display: showForm ? "flex" : "none",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={handleClickSave}
                color={"success"}
                sx={{ mt: 0, ml: 1, display: "flex" }}
                fullWidth
              >
                Add member
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AddMember;
