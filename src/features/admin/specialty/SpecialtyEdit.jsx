import { Alert, Button, FileInput, Label, TextInput } from "flowbite-react";
import React from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
import {
    getOneSpecs,
    updateSpec,
    uploadSpecImg,
} from "../../../api/specialtyService";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SpecialtyEdit() {
    const initState = {
        descriptionHTML: "",
        descriptionMarkdown: "",
        name: "",
    };
    const [specialtyInfo, setSpecialtyInfo] = useState(initState);
    const [image, setImage] = useState(null);
    const [isFail, setIsFail] = useState(false);
    const mdParser = new MarkdownIt();
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            getOneSpecs(id).then((res) => {
                if (res && res.data && res.data.statusCode === 0) {
                    console.log(res.data);
                    setSpecialtyInfo(res.data.spec);
                }
            });
        }
    }, []);

    function handleEditorChange({ html, text }) {
        setSpecialtyInfo({
            ...specialtyInfo,
            descriptionHTML: html,
            descriptionMarkdown: text,
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
    const updateSpecialty = (imgName) => {
        const i = { ...specialtyInfo };
        if (!i.descriptionHTML || !i.descriptionMarkdown || !i.name) {
            alert("Chưa điền đủ thông tin");
            return;
        }
        let data = null;
        if (imgName) {
            data = {
                name: i.name,
                descriptionHTML: i.descriptionHTML,
                descriptionMarkdown: i.descriptionMarkdown,
                image: imgName,
            };
        } else {
            data = {
                name: i.name,
                descriptionHTML: i.descriptionHTML,
                descriptionMarkdown: i.descriptionMarkdown,
            };
        }
        updateSpec(id, data).then((res) => {
            if (res && res.data) {
                if (res.data.statusCode === 0) {
                    navigate("/admin/specialty");
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
                    updateSpecialty(response.data.name);
            });
        } else {
            updateSpecialty();
        }
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
                value={specialtyInfo.descriptionMarkdown}
                onChange={handleEditorChange}
            />
        </>
    );
}

export default SpecialtyEdit;
