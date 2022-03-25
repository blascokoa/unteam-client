import rehypeSanitize from "rehype-sanitize";
import MDEditor from "@uiw/react-md-editor";
import { Box } from "@mui/material";

const LivePreviewPublication = (props) => {
  return (
    <Box sx={{ my: 3 }} data-color-mode="light">
      <MDEditor.Markdown
        source={props.value}
        rehypePlugins={[[rehypeSanitize]]}
      />
    </Box>
  );
};

export default LivePreviewPublication;
