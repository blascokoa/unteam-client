import {
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
    // const response = await deleteGroupSettingsService(groupInfo);
    props.setIsUpdated(!props.isUpdated);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setMemberInfo(props.memberInfo);
  }, []);

  if (memberInfo === "") {
    return <h3>...Loading</h3>;
  }

  return (
    <>
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
        <Button onClick={handleClick} size="small">
          Check Details
        </Button>
        <IconButton aria-label="delete" sx={{ p: 0 }}>
          <DeleteIcon onClick={handleOpenDelete} />
        </IconButton>
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
    </>
  );
};

export default GroupCard;
