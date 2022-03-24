import { Box, Button, Grid, Typography } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import PreviewPublication from "./PreviewPublication";
import { useEffect, useState } from "react";
import {
  addPublicationService,
  editPublicationService,
} from "../../../services/messages.services";

const NewPublication = (props) => {
  const [value, setValue] = useState("");
  const [showFullPreview, setShowFullPreview] = useState(false);

  const {
    newPublicationTitle,
    setShowPublicationsList,
    setShowNewPublication,
    setNewPublicationTitle,
    pubToEdit,
    setPubToEdit,
  } = props;

  const handleSaveClick = async () => {
    console.log("clicked save button");

    try {
      if (pubToEdit) {
        const data = {
          id: pubToEdit._id,
          title: pubToEdit.title,
          body: value,
        };
        await editPublicationService(data);
      } else {
        const data = {
          title: newPublicationTitle,
          body: value,
        };
        await addPublicationService(data);
      }

      setValue("");
      setNewPublicationTitle("");
      setPubToEdit("");
      setShowPublicationsList(true);
      setShowNewPublication(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelClick = () => {
    console.log("Clicked the cancel button");
    setValue("");
    setNewPublicationTitle("");
    setShowPublicationsList(true);
    setShowNewPublication(false);
    setPubToEdit("");
  };

  useEffect(() => {
    setValue(pubToEdit.message ? pubToEdit.message : "");
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            mt: 0,
          }}
        >
          <Button
            variant="outlined"
            color={"primary"}
            onClick={handleCancelClick}
            sx={{ mt: 2, ml: 1, display: "flex" }}
          >
            Cancel
          </Button>
          <Typography variant={"h5"} sx={{ ml: 1, mr: 1, mt: 2 }}>
            {pubToEdit.title ? pubToEdit.title : newPublicationTitle}
          </Typography>
          <Button
            variant="contained"
            color={"success"}
            disabled={value.length <= 0}
            onClick={handleSaveClick}
            sx={{ mt: 2, ml: 1, display: "flex" }}
          >
            Save
          </Button>
        </Box>
        <div data-color-mode="light">
          <MDEditor
            value={value}
            onChange={setValue}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
          />
        </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {value && (
            <Button
              variant="outlined"
              color={"success"}
              onClick={() => {
                setShowFullPreview(!showFullPreview);
              }}
              sx={{ mt: 2, ml: 1, display: "flex" }}
              fullWidth
            >
              Show Full Preview
            </Button>
          )}
        </Box>

        {showFullPreview && <PreviewPublication value={value} />}
      </Grid>
    </Grid>
  );
};

export default NewPublication;
