import { Paper, Container } from "@mui/material";
import { useEffect, useState } from "react";
import SettingsMainFormAdmin from "../elements/SettingsMainFormAdmin";
import SettingsExtraFormAdmin from "../elements/SettingsExtraFormAdmin";
import { getDashboardSettingsService } from "../../../services/settings.services";

const AdminSettingsAdmin = () => {
  const [userData, setUserData] = useState("");
  const [clubData, setClubData] = useState("");
  const [groupsData, setGroupsData] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await getDashboardSettingsService();
        setUserData(response.data.userInfo);
        setClubData(response.data.clubInfo);
        setGroupsData(response.data.groupsInfo);
      } catch (err) {
        console.log(err);
      }
    })();
    console.log(groupsData);
  }, []);

  if (userData === "") {
    return <h3>...Loading</h3>;
  }

  return (
    <>
      <Container component={"main"} maxWidth={"sm"} sx={{ mb: 4 }}>
        <Paper
          variant={"outlined"}
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <SettingsMainFormAdmin userData={userData} clubData={clubData} />
          <SettingsExtraFormAdmin />
        </Paper>
      </Container>
    </>
  );
};

export default AdminSettingsAdmin;
