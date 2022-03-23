import { Link, NavLink, Route, Switch, useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Tab, Tabs, Toolbar } from "@mui/material";

const NavBar = (props) => {
  const { isLoggedIn, setIsLoggedIn } = props;

  const navigate = useNavigate();

  const handleLogOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <AppBar position={"static"}>
      <Toolbar sx={{ backgroundColor: "primary.main", flexGrow: "1" }}>
        <Button
          variant="text"
          sx={{ color: "text.primary" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
        <Box sx={{ marginLeft: "auto" }}>
          {isLoggedIn && (
            <Link to="/dashboard">
              <Button
                sx={{ marginLeft: "auto", color: "text.primary" }}
                label={"Dashboard"}
              >
                Dashboard
              </Button>
            </Link>
          )}
          {!isLoggedIn && (
            <Button
              sx={{
                marginLeft: "auto",
                color: "text.primary",
              }}
              label={"Open App"}
              underline="hover"
              onClick={() => {
                navigate("/login");
              }}
            >
              Open App
            </Button>
          )}
          <Button
            onClick={() => {
              navigate("/contact");
            }}
            underline="hover"
            sx={{
              marginLeft: "auto ",
              color: "text.primary",
            }}
          >
            Contact
          </Button>
          {isLoggedIn && (
            <Button
              onClick={handleLogOut}
              sx={{
                marginLeft: "auto ",
                color: "text.primary",
              }}
            >
              Log Out
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
