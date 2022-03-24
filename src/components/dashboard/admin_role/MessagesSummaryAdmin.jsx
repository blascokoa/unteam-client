import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import NewPublication from "../elements/NewPublication";
import PublicationsList from "../elements/PublicationsList";
import { getPublicationsService } from "../../../services/messages.services";
import PreviewPublication from "../elements/PreviewPublication";

const MessagesSummaryAdmin = (props) => {
  const [showNewPublication, setShowNewPublication] = useState(false);
  const [showPublicationsList, setShowPublicationsList] = useState(true);
  const [newPublicationTitle, setNewPublicationTitle] = useState("");
  const [publicationsList, setPublicationsList] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewPublication, setPreviewPublication] = useState("");

  const { loggedUser } = props;

  useEffect(() => {
    console.log("Get all the publications");
    (async () => {
      props.getNewMessages();
      const result = await getPublicationsService();
      setPublicationsList(result.data);
    })();
  }, [showNewPublication, showPublicationsList]);

  if (!publicationsList) {
    return <h3>Loading</h3>;
  }

  return (
    <Paper
      variant={"outlined"}
      sx={{
        my: { xs: 2, md: 3 },
        p: { xs: 0, md: 4 },
      }}
    >
      {showPublicationsList && (
        <PublicationsList
          loggedUser={loggedUser}
          newPublicationTitle={newPublicationTitle}
          setNewPublicationTitle={setNewPublicationTitle}
          setShowNewPublication={setShowNewPublication}
          setShowPublicationsList={setShowPublicationsList}
          publicationsList={publicationsList}
          setShowPreview={setShowPreview}
          setPreviewPublication={setPreviewPublication}
        />
      )}
      {showNewPublication && (
        <NewPublication
          loggedUser={loggedUser}
          newPublicationTitle={newPublicationTitle}
          setShowPublicationsList={setShowPublicationsList}
          setShowNewPublication={setShowNewPublication}
          setNewPublicationTitle={setNewPublicationTitle}
        />
      )}
      {showPreview && (
        <PreviewPublication
          loggedUser={loggedUser}
          previewPublication={previewPublication}
          setShowPublicationsList={setShowPublicationsList}
          setShowPreview={setShowPreview}
        />
      )}
    </Paper>
  );
};

export default MessagesSummaryAdmin;
