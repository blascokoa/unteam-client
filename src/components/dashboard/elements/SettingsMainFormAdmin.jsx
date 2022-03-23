import {
  Avatar,
  Box,
  Button,
  FormControlLabel,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import {
  getDashboardSettingsService,
  updateDashboardSettingsService,
} from "../../../services/settings.services";

const SettingsMainFormAdmin = (props) => {
  const [editEnabled, setEditEnabled] = useState(true);
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [clubNameValue, setClubNameValue] = useState("");
  const [clubNif, setClubNif] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: emailValue,
      fullName: nameValue,
      clubName: clubNameValue,
    };
    const response = fetchData(data);
  };

  const fetchData = async (data) => {
    try {
      const response = await updateDashboardSettingsService(data);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }

    console.log(color);
    return color;
  };

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 100,
        height: 100,
      },
      children: getInitials(name),
    };
  };

  const getInitials = (name) => {
    if (name.split(" ") > 1) {
      return `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;
    } else {
      return `${name.split(" ")[0][0]}`;
    }
  };

  const { email } = props.userData;

  const { name, nif } = props.clubData;

  useEffect(() => {
    // TODO solve the issues with the routes.
    const fullName = props.userData.contactDetails.fullName;
    setNameValue(fullName ? fullName : "");
    setEmailValue(email);
    setClubNif(nif);
    setClubNameValue(name);
  }, [props]);

  return (
    <>
      <Box component={"form"} noValidate onSubmit={handleSubmit} sx={{ mt: 0 }}>
        <Grid container>
          <Grid item md={12}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <Avatar {...stringAvatar(nameValue ? nameValue : "Anon")} />
            </Box>
            <label htmlFor="contained-button-file">
              <Box
                sx={{
                  display: editEnabled ? "none" : "flex",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </Box>
            </label>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography component="h1" variant="h5">
            Profile Info
          </Typography>
          <FormControlLabel
            sx={{ color: "text.primary" }}
            label="Edit"
            control={
              <Switch
                checked={!editEnabled}
                onChange={() => {
                  setEditEnabled(!editEnabled);
                }}
              />
            }
          />
        </Box>
        <>
          <Grid container>
            <Grid item md={12}>
              <TextField
                fullWidth
                disabled={editEnabled}
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
                disabled
                id="email"
                label="E-Mail"
                variant="standard"
                InputLabelProps={{
                  style: { color: "#F54257" },
                }}
                value={emailValue}
              />
              <TextField
                fullWidth
                disabled={editEnabled}
                id="clubName"
                label="Club Name"
                variant="standard"
                InputLabelProps={{
                  style: { color: "#F54257" },
                }}
                value={clubNameValue}
                onChange={(e) => setClubNameValue(e.target.value)}
              />
              <TextField
                fullWidth
                disabled={true}
                id="nif"
                label="Club NIF"
                variant="standard"
                InputLabelProps={{
                  style: { color: "#F54257" },
                }}
                value={clubNif}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 3, ml: 1, display: editEnabled ? "none" : "flex" }}
              fullWidth
            >
              Save Profile Info
            </Button>
          </Box>
        </>
      </Box>
    </>
  );
};

export default SettingsMainFormAdmin;
