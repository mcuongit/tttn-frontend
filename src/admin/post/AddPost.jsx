import { Button, FileInput, Label, Select, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";
import { findAllCategory } from "../../api/categoryService";
import CGMdEditor from "../../components/common/CGMdEditor";
import { createPost, uploadPostImg } from "../../api/postService";
import { useNavigate } from "react-router-dom";

function AddPost() {
    const navigate = useNavigate();
    const [post, setPost] = useState({
        title: "",
        markdown: "",
        html: "",
        catId: "",
        image: "",
    });
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState();
    useEffect(() => {
        document.title = "Thêm bài viết";
        findAllCategory().then((res) => {
            setCategories(res.data);
        });
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({
            ...post,
            [name]: value,
        });
    };
    const handleEditorChange = ({ html, text }) => {
        setPost({
            ...post,
            markdown: text,
            html: html,
        });
    };

    const handleFileChange = (e) => {
        const { files } = e.target;
        setImage(files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (image) {
            const formData = new FormData();
            formData.append("image", image);
            uploadPostImg(formData).then((res) => {
                const _data = {
                    ...post,
                    image: res.data.name,
                };
                createNewPost(_data);
            });
        } else {
            createNewPost();
        }
    };

    const createNewPost = (data = null) => {
        if (data)
            createPost(data).then(() => {
                navigate("/admin/post");
            });
        else
            createPost(post).then(() => {
                navigate("/admin/post");
            });
    };
    return (
        <form method="post" onSubmit={handleSubmit}>
            <div className="mb-5 flex justify-between items-center">
                <h1 className="text-2xl uppercase font-semibold">
                    Thêm bài viết
                </h1>
                <Button type="submit" size={"sm"}>
                    Lưu thông tin
                </Button>
            </div>
            <div className="flex gap-x-3 mb-3">
                <div className="grow">
                    <div className="mb-2">
                        <Label value="Tiêu đề bài viết" htmlFor="title" />
                    </div>
                    <TextInput
                        id="title"
                        type="text"
                        placeholder="Nhập tiêu đề bài viết"
                        value={post.title}
                        onChange={handleChange}
                        name="title"
                    />
                </div>
                <div className="grow">
                    <div className="mb-2">
                        <Label value="Danh mục" htmlFor="catId" />
                    </div>
                    <Select
                        id="catId"
                        value={post.catId}
                        onChange={handleChange}
                        name="catId"
                        required
                    >
                        <option value="">Chọn danh mục</option>
                        {categories.length > 0 &&
                            categories.map((item) => {
                                return (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                    </Select>
                </div>
                <div className="grow">
                    <div className="mb-2">
                        <Label value="Hình ảnh" htmlFor="image" />
                    </div>
                    <FileInput id="image" onChange={handleFileChange} />
                </div>
            </div>
            <div>
                <div className="mb-2">
                    <Label value="Nội dung bài viết" />
                </div>
                <CGMdEditor handleEditorChange={handleEditorChange} />
            </div>
        </form>
    );
}

export default AddPost;
