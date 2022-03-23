import {
  Box,
  Button,
  Card,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import {
  addGroupSettingsService,
  deleteGroupSettingsService,
  getDashboardSettingsService,
} from "../../../services/settings.services";
import GroupCard from "./GroupCard";

const SettingsExtraFormAdmin = (props) => {
  const [editExtraEnabled, setEditExtraEnabled] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [newGroupValue, setNewGroupValue] = useState("");
  const [groupsData, setGroupsData] = useState("");
  const [clubData, setClubData] = useState("");

  const addGroup = async (data) => {
    const response = await addGroupSettingsService(data);
    updateInfo();
    return response;
  };

  const updateInfo = async () => {
    const response = await getDashboardSettingsService();
    setGroupsData(response.data.groupsInfo);
    setClubData(response.data.clubInfo);
  };

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    setEditExtraEnabled(!editExtraEnabled);
    setNewGroupValue("");

    const data = { name: newGroupValue, clubId: clubData };
    addGroup(data);
  };

  useEffect(() => {
    updateInfo();
  }, [editExtraEnabled, isUpdated]);

  if (groupsData === "") {
    return <h3>...Loading</h3>;
  }

  return (
    <>
      <Box
        component={"form"}
        noValidate
        onSubmit={handleSubmitDetails}
        sx={{ mt: 0 }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Typography component="h1" variant="h5">
            Groups
          </Typography>
          <FormControlLabel
            sx={{ color: "text.primary" }}
            label="Add"
            control={
              <Switch
                checked={!editExtraEnabled}
                onChange={() => {
                  setEditExtraEnabled(!editExtraEnabled);
                }}
              />
            }
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            fullWidth
            disabled={editExtraEnabled}
            id="name"
            label="Name"
            variant="standard"
            InputLabelProps={{
              style: { color: "#F54257" },
            }}
            sx={{ display: editExtraEnabled ? "none" : "flex" }}
            value={newGroupValue}
            onChange={(e) =>
              setNewGroupValue(
                e.target.value.replace(/^\w/, (c) => c.toUpperCase())
              )
            }
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              mt: 3,
              ml: 1,
              display: editExtraEnabled ? "none" : "flex",
            }}
            fullWidth
          >
            Save New Group
          </Button>
        </Box>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {groupsData.map((eachGroup, i) => {
            return (
              <Grid item xs={12} sm={6} md={4}>
                <Card variant={"outlined"}>
                  <GroupCard
                    eachGroup={eachGroup}
                    setIsUpdated={setIsUpdated}
                    isUpdated={isUpdated}
                    key={i}
                  />
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default SettingsExtraFormAdmin;
