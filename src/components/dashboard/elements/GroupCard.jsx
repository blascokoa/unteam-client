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
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteGroupSettingsService } from "../../../services/settings.services";

const GroupCard = (props) => {
  const [open, setOpen] = useState(false);
  const [nMembers, setNMembers] = useState(0);
  const [groupInfo, setGroupInfo] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Clicking the more members button");
  };

  const handleOpenDelete = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleCloseDelete = async () => {
    setOpen(false);
    const response = await deleteGroupSettingsService(groupInfo);
    props.setIsUpdated(!props.isUpdated);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setGroupInfo(props.eachGroup);
    setNMembers(groupInfo.members ? groupInfo.members.length : 0);
  }, [props]);

  return (
    <>
      <CardContent sx={{ p: 1 }}>
        <Typography
          sx={{ fontSize: 16, fontWeight: "bold" }}
          color="text.primary"
          gutterBottom
          align={"center"}
        >
          {groupInfo.name}
        </Typography>
        <Typography variant="body2">Members: {nMembers}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleClick} size="small">
          Check Members
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
            {"Delete group: " + groupInfo.name}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              color={"text.primary"}
            >
              Are you sure you want to delete this group?
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
