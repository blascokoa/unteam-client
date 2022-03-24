import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PreviewPublication = (props) => {
  const [publication, setPublication] = useState("");

  const handleGoBack = () => {
    props.setShowPreview(false);
    props.setShowPublicationsList(true);
    console.log("Go back");
  };

  useEffect(() => {
    setPublication(props.previewPublication);
  }, [props]);

  if (!publication) {
    return <h3>Loading....</h3>;
  }

  console.log(publication);
  return (
    <div data-color-mode="light">
      <Paper
        variant={"outlined"}
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant={"h5"}>{publication.title}</Typography>
            <Button
              variant={"contained"}
              color="primary"
              size="small"
              endIcon={<ArrowBackIcon />}
              onClick={handleGoBack}
              sx={{ ml: "auto" }}
            >
              Return
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />
          <MDEditor.Markdown
            source={publication.message}
            rehypePlugins={[[rehypeSanitize]]}
          />
        </Box>
      </Paper>
    </div>
  );
};

export default PreviewPublication;
