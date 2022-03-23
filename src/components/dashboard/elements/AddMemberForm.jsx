import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/lab";

const AddMemberForm = () => {
  const [nameValue, setNameValue] = useState("");
  const [surnameValue, setSurnameValue] = useState("");
  const [birthdayDate, setbirthdayDate] = useState(
    new Date("2022-01-01T08:00:00")
  );

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Typography component="h1" variant="h5" fontWeight="bold">
          Register a member
        </Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Grid container>
          <Grid item md={12}>
            <TextField
              fullWidth
              id="name"
              label="Name"
              variant="standard"
              InputLabelProps={{
                style: { color: "#F54257" },
              }}
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
            />
            <TextField
              fullWidth
              id="surname"
              label="Surname"
              variant="standard"
              InputLabelProps={{
                style: { color: "#F54257" },
              }}
              sx={{ mb: 3 }}
              value={surnameValue}
              onChange={(e) => setSurnameValue(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Birthday Date"
                value={birthdayDate}
                onChange={(newValue) => {
                  setbirthdayDate(newValue);
                }}
                InputLabelProps={{
                  style: { color: "#F54257" },
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AddMemberForm;
