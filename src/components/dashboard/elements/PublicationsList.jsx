import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { addReaderService } from "../../../services/messages.services";

const PublicationsList = (props) => {
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const [openNewPublicationDialog, setOpenNewPublicationDialog] =
    useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const {
    newPublicationTitle,
    setNewPublicationTitle,
    setShowNewPublication,
    setShowPublicationsList,
    publicationsList,
    setShowPreview,
    setPreviewPublication,
    loggedUser,
  } = props;

  const handleCheckBoxChange = (id) => {
    const checkedBoxesArr = [...checkedBoxes];
    if (checkedBoxesArr.includes(id)) {
      checkedBoxesArr.splice(checkedBoxesArr.indexOf(id), 1);
    } else {
      checkedBoxesArr.push(id);
    }
    setCheckedBoxes(checkedBoxesArr);
  };

  const handleClose = () => {
    console.log("Closing the form");
    setNewPublicationTitle("");
    setOpenNewPublicationDialog(false);
  };

  const handleWritePublication = () => {
    if (newPublicationTitle) {
      setOpenNewPublicationDialog(false);
      setShowNewPublication(true);
      setShowPublicationsList(false);
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  const handleDeleteButton = () => {
    console.log("Clicking the delete button");
  };

  const handleShowPreview = async (publication) => {
    console.log("Show preview");
    setShowPreview(true);
    setShowPublicationsList(false);
    const data = {
      id: publication._id,
    };
    await addReaderService(data);
    setPreviewPublication(publication);
  };

  const handleEditPublication = () => {
    console.log("Handle Edit button");
  };

  const handleSendPublication = async () => {
    console.log("Handle send Publications via email");
  };

  useEffect(() => {
    console.log(loggedUser.role);
    console.log(loggedUser === "admin");
    console.log(checkedBoxes);
  }, [checkedBoxes]);

  const listElement = (eachPublication) => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
        }}
        key={eachPublication._id}
      >
        {loggedUser.role === "admin" && (
          <Checkbox
            color="primary"
            checked={checkedBoxes.includes(eachPublication._id)}
            onChange={() => {
              handleCheckBoxChange(eachPublication._id);
            }}
          />
        )}
        <Box sx={{ mr: 2 }}>
          <Typography variant={"body1"}>{eachPublication.title}</Typography>
        </Box>
        <Box sx={{ mr: 2 }}>
          <IconButton
            aria-label="delete"
            color="primary"
            sx={{ mr: 2 }}
            onClick={() => {
              handleShowPreview(eachPublication);
            }}
          >
            <VisibilityIcon />
          </IconButton>
          {loggedUser.role === "admin" && (
            <>
              <Button
                variant={"outlined"}
                color="success"
                size="small"
                sx={{ mr: 2 }}
                onClick={() => {
                  handleEditPublication(eachPublication);
                }}
              >
                Edit
              </Button>
              <Button
                variant={"contained"}
                color="success"
                size="small"
                endIcon={<SendIcon />}
                onClick={() => {
                  handleSendPublication(eachPublication);
                }}
              >
                Send
              </Button>
            </>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          {/* --------------------- Header ---------------------*/}
          <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
            {loggedUser.role === "admin" && (
              <IconButton
                aria-label="delete"
                disabled={checkedBoxes.length <= 0}
                color="primary"
                onClick={handleDeleteButton}
              >
                <DeleteIcon />
              </IconButton>
            )}
            <Typography variant={"h5"}>Your Publications</Typography>
            {loggedUser.role === "admin" && (
              <Button
                variant={"outlined"}
                color="success"
                size="small"
                endIcon={<AddIcon />}
                onClick={() => {
                  setOpenNewPublicationDialog(true);
                }}
                sx={{ mr: 2 }}
              >
                New
              </Button>
            )}
          </Box>
          <Divider />
          {/* ------------ Publications List  ------------------*/}
          {publicationsList.map((eachPublication) => {
            return listElement(eachPublication);
          })}
        </Grid>
      </Grid>
      {/* -------------- Aqui empieza el DIALOG ------------------*/}
      <Dialog open={openNewPublicationDialog} onClose={handleClose}>
        <DialogTitle>Add a New Publication</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#120000" }}>
            Please introduce the title for your new publication
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            color="primary"
            type="text"
            fullWidth
            variant="standard"
            value={newPublicationTitle}
            onChange={(e) => {
              setNewPublicationTitle(e.target.value);
            }}
          />
        </DialogContent>
        {showAlert && (
          <Alert severity="error">Please fill the title field.</Alert>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleWritePublication}>Continue</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PublicationsList;
