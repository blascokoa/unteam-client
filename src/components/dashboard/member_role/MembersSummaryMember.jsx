import { useEffect, useState } from "react";
import {
  getMembersFromClubService,
  getMembersFromUserService,
} from "../../../services/members.services";
import MemberCard from "../elements/MemberCard";
import { Container, Grid, Paper } from "@mui/material";
import NoMember from "../elements/NoMember";
import AddMember from "../elements/AddMember";

const MembersSummaryMember = (props) => {
  const [userInfo, setUserInfo] = useState("");
  const [userMembers, setUserMembers] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    setUserInfo(props.loggedUser);

    (async () => {
      if (userInfo.role === "member") {
        const response = await getMembersFromUserService();
        setUserMembers(response.data);
      } else if (userInfo.role === "admin") {
        const response = await getMembersFromClubService();
        setUserMembers(response.data);
      }
    })(props);
  }, [props, isUpdated, userInfo]);

  if (userInfo === "") {
    return <h3>...Loading</h3>;
  }

  if (userMembers.length === 0) {
    return (
      <div>
        <NoMember />
        <AddMember
          setIsUpdated={setIsUpdated}
          isUpdated={isUpdated}
          userInfo={userInfo}
        />
      </div>
    );
  }

  return (
    <div>
      <AddMember
        setIsUpdated={setIsUpdated}
        isUpdated={isUpdated}
        role={userInfo.role}
      />
      <Container component={"main"} maxWidth={"sm"} sx={{ mb: 4 }}>
        <Paper
          variant={"outlined"}
          sx={{
            my: { xs: 3, md: 6 },
            p: { xs: 2, md: 3 },
          }}
        >
          <Grid container spacing={2}>
            {userMembers.map((eachMember, index) => {
              return (
                <Grid item xs={12} sm={6}>
                  <MemberCard
                    eachMember={eachMember}
                    key={index}
                    setIsUpdated={setIsUpdated}
                    isUpdated={isUpdated}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default MembersSummaryMember;
