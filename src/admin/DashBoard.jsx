import { useEffect } from "react";
import { docTitle } from "../utils/constant";
import "react-markdown-editor-lite/lib/index.css";

function DashBoard() {
    useEffect(() => {
        const { dashboard } = docTitle.ADMIN;
        document.title = dashboard;
    }, []);

    return (
        <div>
            <p>DashBoard</p>
        </div>
    );
}

export default DashBoard;
