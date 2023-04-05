import { Alert, Button, FileInput, Label, TextInput } from "flowbite-react";
import React from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
import { createNewSpec, uploadSpecImg } from "../../../api/specialtyService";

function SpecialtyAdd() {
    const [specialtyInfo, setSpecialtyInfo] = useState({
        contentHTML: "",
        contentMarkdown: "",
        name: "",
    });
    const [image, setImage] = useState(null);
    const [isCreated, setIsCreated] = useState(false);
    const [isFail, setIsFail] = useState(false);
    const mdParser = new MarkdownIt();
    function handleEditorChange({ html, text }) {
        setSpecialtyInfo({
            ...specialtyInfo,
            contentHTML: html,
            contentMarkdown: text,
        });
    }
    const handleChange = (e) => {
        setSpecialtyInfo({
            ...specialtyInfo,
            name: e.target.value,
        });
    };
    const handleFileChange = (e) => {
        const data = e.target.files;
        const file = data[0];
        if (!file) return;
        setImage(file);
    };
    const createSpecialty = (imgName) => {
        const i = { ...specialtyInfo };
        if (!i.contentHTML || !i.contentMarkdown || !i.name) {
            alert("Chưa điền đủ thông tin");
            return;
        }
        const data = {
            name: i.name,
            descriptionHTML: i.contentHTML,
            descriptionMarkdown: i.contentMarkdown,
            image: imgName ? imgName : "",
        };
        createNewSpec(data).then((res) => {
            if (res && res.data) {
                if (res.data.statusCode === 0) {
                    setIsCreated(true);
                } else {
                    setIsFail(true);
                }
            }
        });
    };
    const handleSubmit = () => {
        if (image) {
            const formData = new FormData();
            formData.append("image", image);
            uploadSpecImg(formData).then((response) => {
                if (response && response.data)
                    createSpecialty(response.data.name);
            });
        }
        createSpecialty();
    };
    return (
        <>
            <div className="flex justify-between items-center mb-3">
                <h1 className="text-2xl uppercase font-semibold">
                    Thêm mới chuyên khoa
                </h1>
                <Button size="sm" onClick={handleSubmit}>
                    Lưu
                </Button>
            </div>
            {isCreated && (
                <div className="mb-3">
                    <Alert
                        color="success"
                        onDismiss={function onDismiss() {
                            return setIsCreated(false);
                        }}
                    >
                        Thêm thành công.
                    </Alert>
                </div>
            )}
            {isFail && (
                <div className="mb-3">
                    <Alert
                        color="failure"
                        onDismiss={function onDismiss() {
                            return setIsFail(false);
                        }}
                    >
                        Có lỗi xảy ra.
                    </Alert>
                </div>
            )}

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Tên chuyên khoa" />
                    </div>
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={specialtyInfo.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="file" value="Hình ảnh chuyên khoa" />
                    </div>
                    <FileInput
                        id="file"
                        onChange={handleFileChange}
                        helperText="A profile picture is useful to confirm your are logged into your account"
                    />
                </div>
            </div>
            <Label value="Viết bài" />
            <MdEditor
                style={{ height: "500px", marginTop: 8 }}
                renderHTML={(text) => mdParser.render(text)}
                value={specialtyInfo.contentMarkdown}
                onChange={handleEditorChange}
            />
        </>
    );
}

export default SpecialtyAdd;
