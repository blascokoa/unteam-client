import {
  Box,
  Button,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { deleteGroupSettingsService } from "../../../services/settings.services";
import { deleteMemberFromUserService } from "../../../services/members.services";

const GroupCard = (props) => {
  const [open, setOpen] = useState(false);
  const [memberInfo, setMemberInfo] = useState("");

  const handleClick = () => {
    console.log("Checking member details");
  };

  const handleOpenDelete = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleCloseDelete = async () => {
    setOpen(false);
    console.log("deleting member");

    const response = await deleteMemberFromUserService(memberInfo._id);
    props.setIsUpdated(!props.isUpdated);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setMemberInfo(props.eachMember);
  }, [props]);

  if (memberInfo === "") {
    return <h3>...Loading</h3>;
  }

  return (
    <>
      <Box
        sx={{
          p: 2,
          border: "1px solid #F54257",
          borderRadius: "5px",
          boxShadow: "7px 4px 4px 0px rgba(112,101,105,0.65)",
        }}
      >
        <CardContent sx={{ p: 1 }}>
          <Typography
            sx={{ fontSize: 16, fontWeight: "bold" }}
            color="text.primary"
            gutterBottom
            align={"center"}
          >
            {memberInfo.name}
          </Typography>
        </CardContent>
        <CardActions>
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              ml: "20%",
            }}
          >
            <Box>
              <Button onClick={handleClick} size="small">
                Check Details
              </Button>
            </Box>
            <Box>
              <IconButton aria-label="delete" sx={{ p: 0 }}>
                <DeleteIcon onClick={handleOpenDelete} />
              </IconButton>
            </Box>
          </Box>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Delete member: " + memberInfo.name}
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                color={"text.primary"}
              >
                Are you sure you want to delete this member?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleCloseDelete} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </CardActions>
      </Box>
    </>
  );
};

export default GroupCard;
