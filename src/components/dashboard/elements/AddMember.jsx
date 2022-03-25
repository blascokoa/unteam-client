import {
  Alert,
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
import { addMemberFromUserService } from "../../../services/members.services";

const AddMember = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState("");
  const [formError, setFormError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setShowForm(!showForm);
  };

  const handleClickSave = async (e) => {
    e.preventDefault();
    const { name, surname, birthday } = formData;
    const year = birthday.getFullYear();
    if (!name || !surname || !year) {
      setFormError(true);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    } else {
      setFormError(false);
      if (!formError) {
        const data = {
          name,
          surname,
          birthday,
          year,
        };
        props.setIsUpdated(!props.isUpdated);
        const response = await addMemberFromUserService(data);
        console.log(response.status);
      }
    }
  };

  const noAddMemberButton = (
    <Grid item xs={showForm ? 6 : 12}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant={"h5"}>List of Members</Typography>
      </Box>
    </Grid>
  );

  return (
    <Container component={"main"} maxWidth={"sm"} sx={{ mb: 4 }}>
      <Paper
        variant={"outlined"}
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Collapse in={showForm}>
          <AddMemberForm setFormData={setFormData} />
        </Collapse>
        <Collapse in={showAlert}>
          <Alert severity="error" sx={{ m: 1, mb: 3 }}>
            Please fill all the fields
          </Alert>
        </Collapse>

        {/* TODO: this is the add member button form, need to be fixed */}
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
          {/* -------------------------------------------------------- */}

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
