import { useEffect, useState } from "react";
import { findOnePost } from "../../api/postService";

function About() {
    const [content, setContent] = useState({
        html: "",
    });
    const [title, setTitle] = useState("");
    useEffect(() => {
        findOnePost(7).then((res) => {
            document.title = res.data.title;
            setTitle(res.data.title);
            setContent(res.data);
        });
    }, []);

    return (
        <section className="max-w-screen-xl mx-auto py-5">
            <h1 className="text-3xl font-bold tracking-tight mb-5">{title}</h1>
            <article
                className="prose mx-auto p-5 bg-sky-50"
                dangerouslySetInnerHTML={{ __html: content.html }}
            />
        </section>
    );
}

export default About;
