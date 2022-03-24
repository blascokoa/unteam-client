import {
  Badge,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";

const AdminDrawer = (props) => {
  const [clickMembers, setClickMembers] = useState(false);
  const [clickMessages, setClickMessages] = useState(false);
  const [clickEvents, setClickEvents] = useState(false);
  const [clickFinances, setClickFinances] = useState(false);
  const [clickSettings, setClickSettings] = useState(false);

  const tabSelector = (buttonKey) => {
    // eslint-disable-next-line default-case
    switch (buttonKey) {
      case 0:
        setClickMembers(true);
        setClickMessages(false);
        setClickEvents(false);
        setClickFinances(false);
        setClickSettings(false);
        break;
      case 1:
        setClickMembers(false);
        setClickMessages(true);
        setClickEvents(false);
        setClickFinances(false);
        setClickSettings(false);
        break;
      case 2:
        setClickMembers(false);
        setClickMessages(false);
        setClickEvents(true);
        setClickFinances(false);
        setClickSettings(false);
        break;
      case 3:
        setClickMembers(false);
        setClickMessages(false);
        setClickEvents(false);
        setClickFinances(true);
        setClickSettings(false);
        break;
      case 11:
        setClickMembers(false);
        setClickMessages(false);
        setClickEvents(false);
        setClickFinances(false);
        setClickSettings(true);
        break;
    }
  };

  const clickerHandler = (buttonKey) => {
    tabSelector(buttonKey);
    props.setCurrentTabIndex(buttonKey);
  };

  return (
    <div>
      <Divider />
      <List>
        <ListItemButton
          key={"0"}
          selected={clickMembers}
          onClick={(e) => {
            e.preventDefault();
            clickerHandler(0);
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary={"Members"} />
        </ListItemButton>
        <ListItemButton
          key={"1"}
          selected={clickMessages}
          onClick={(e) => {
            e.preventDefault();
            clickerHandler(1);
          }}
        >
          <ListItemIcon>
            <Badge badgeContent={props.unReadMessages} color="primary">
              <MailIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary={"Messages"} />
        </ListItemButton>
        <ListItemButton
          key={"2"}
          selected={clickEvents}
          onClick={(e) => {
            e.preventDefault();
            clickerHandler(2);
          }}
        >
          <ListItemIcon>
            <EmojiEventsIcon />
          </ListItemIcon>
          <ListItemText primary={"Events"} />
        </ListItemButton>
        <ListItemButton
          key={"3"}
          selected={clickFinances}
          onClick={(e) => {
            e.preventDefault();
            clickerHandler(3);
          }}
        >
          <ListItemIcon>
            <AccountBalanceWalletIcon />
          </ListItemIcon>
          <ListItemText primary={"Finances"} />
        </ListItemButton>
      </List>
      <Divider />
      <List>
        <ListItemButton
          key={"11"}
          selected={clickSettings}
          onClick={(e) => {
            e.preventDefault();
            clickerHandler(11);
          }}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={"Settings"} />
        </ListItemButton>
      </List>
    </div>
  );
};

export default AdminDrawer;
