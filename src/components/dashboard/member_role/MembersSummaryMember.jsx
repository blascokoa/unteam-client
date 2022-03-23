import { useEffect, useState } from "react";
import { getMembersFromUserService } from "../../../services/members.services";
import MemberCard from "../elements/MemberCard";
import { Container, Paper, Typography } from "@mui/material";
import SettingsMainFormAdmin from "../elements/SettingsMainFormAdmin";
import SettingsExtraFormAdmin from "../elements/SettingsExtraFormAdmin";
import NoMember from "../elements/NoMember";
import AddMember from "../elements/AddMember";

const MembersSummaryMember = (props) => {
  const [userInfo, setUserInfo] = useState("");
  const [userMembers, setUserMembers] = useState([]);

  useEffect(() => {
    setUserInfo(props.loggedUser);
    (async () => {
      const response = await getMembersFromUserService();
      setUserMembers(response.data);
    })(props);
  }, [props.loggedUser]);

  if (userInfo === "") {
    return <h3>...Loading</h3>;
  }

  if (userMembers.length === 0) {
    return (
      <div>
        <NoMember />
        <AddMember />
      </div>
    );
  }

  return (
    <div>
      {userMembers.map((eachMember) => {
        <MemberCard eachMember={eachMember} />;
      })}
    </div>
  );
};

export default MembersSummaryMember;
