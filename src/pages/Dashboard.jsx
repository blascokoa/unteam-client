import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDrawer from "../components/dashboard/AdminDrawer";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
} from "@mui/material";
import MessagesSummaryAdmin from "../components/dashboard/admin_role/MessagesSummaryAdmin";
import EventsSummaryAdmin from "../components/dashboard/admin_role/EventsSummaryAdmin";
import AdminSettingsAdmin from "../components/dashboard/admin_role/AdminSettingsAdmin";
import { useTheme } from "@mui/material/styles";
import FinancesSummaryAdmin from "../components/dashboard/admin_role/FinancesSummaryAdmin";
import MembersSummaryMember from "../components/dashboard/member_role/MembersSummaryMember";
import MessagesSummaryMember from "../components/dashboard/member_role/MessagesSummaryMember";
import EventsSummaryMember from "../components/dashboard/member_role/EventsSummaryMember";
import FinancesSummaryMember from "../components/dashboard/member_role/FinancesSummaryMember";
import AdminSettingsMember from "../components/dashboard/member_role/AdminSettingsMember";

const Dashboard = (props) => {
  const drawerWidth = 200;
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (!props.isLoggedIn) {
      navigate("/login");
    }
  }, [props.isLoggedIn, currentTabIndex]);

  const selectDrawer = () => {
    if (props.loggedUser.role) {
      const { role } = props.loggedUser;
      switch (role) {
        case "admin":
          return <AdminDrawer setCurrentTabIndex={setCurrentTabIndex} />;
          break;
        case "member":
          return <AdminDrawer setCurrentTabIndex={setCurrentTabIndex} />;
          break;
        default:
          return <AdminDrawer setCurrentTabIndex={setCurrentTabIndex} />;
          break;
      }
    }
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position={useTheme().breakpoints.up("sm") ? "fixed" : "static"}
          color="primary"
          elevation={0}
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            height: "50px",
            display: { sm: "none" },
          }}
        >
          <Toolbar>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              size="large"
              sx={{ mr: 2, ml: 1, display: { sm: "none" } }}
            >
              <MenuTwoToneIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {selectDrawer()}
          </Drawer>
          {/*Lateral Bar*/}
          <Drawer
            variant="permanent"
            position="static"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                marginTop: "65px",
              },
            }}
            open
          >
            {selectDrawer()}
          </Drawer>
        </Box>
      </Box>

      <Box
        component={"main"}
        sx={{
          ml: { sm: `${drawerWidth}px` },
          mt: { xs: `20px`, sm: 0 },
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {currentTabIndex === 0 && props.loggedUser.role === "admin" && (
          <MembersSummaryMember loggedUser={props.loggedUser} />
        )}
        {currentTabIndex === 1 && props.loggedUser.role === "admin" && (
          <MessagesSummaryAdmin loggedUser={props.loggedUser} />
        )}
        {currentTabIndex === 2 && props.loggedUser.role === "admin" && (
          <EventsSummaryAdmin loggedUser={props.loggedUser} />
        )}
        {currentTabIndex === 3 && props.loggedUser.role === "admin" && (
          <FinancesSummaryAdmin loggedUser={props.loggedUser} />
        )}
        {currentTabIndex === 11 && props.loggedUser.role === "admin" && (
          <AdminSettingsAdmin loggedUser={props.loggedUser} />
        )}

        {currentTabIndex === 0 && props.loggedUser.role === "member" && (
          <MembersSummaryMember loggedUser={props.loggedUser} />
        )}
        {currentTabIndex === 1 && props.loggedUser.role === "member" && (
          <MessagesSummaryMember loggedUser={props.loggedUser} />
        )}
        {currentTabIndex === 2 && props.loggedUser.role === "member" && (
          <EventsSummaryMember loggedUser={props.loggedUser} />
        )}
        {currentTabIndex === 3 && props.loggedUser.role === "member" && (
          <FinancesSummaryMember loggedUser={props.loggedUser} />
        )}
        {currentTabIndex === 11 && props.loggedUser.role === "member" && (
          <AdminSettingsMember loggedUser={props.loggedUser} />
        )}
      </Box>
    </div>
  );
};

export default Dashboard;
