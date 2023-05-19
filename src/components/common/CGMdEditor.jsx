import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
function CGMdEditor(props) {
    const { handleEditorChange, markdown } = props;
    const mdParser = new MarkdownIt();
    return (
        <MdEditor
            style={{ height: "500px", marginTop: 8 }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            value={markdown}
        />
    );
}

export default CGMdEditor;
