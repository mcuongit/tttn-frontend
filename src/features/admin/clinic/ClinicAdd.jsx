import { Alert, Button, FileInput, Label, TextInput } from "flowbite-react";
import React from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
import { useEffect } from "react";
import { docTitle } from "../../../utils/constant";
import { createNewClinic, uploadClinicImage } from "../../../api/clinicService";

function ClinicAdd() {
    useEffect(() => {
        document.title = docTitle.ADMIN.add_clinic;
    }, []);

    const [clinicInfo, setClinicInfo] = useState({
        contentHTML: "",
        contentMarkdown: "",
        name: "",
        address: "",
    });
    const [image, setImage] = useState(null);
    const [isCreated, setIsCreated] = useState(false);
    const [isFail, setIsFail] = useState(false);
    const mdParser = new MarkdownIt();
    function handleEditorChange({ html, text }) {
        setClinicInfo({
            ...clinicInfo,
            contentHTML: html,
            contentMarkdown: text,
        });
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setClinicInfo({
            ...clinicInfo,
            [name]: value,
        });
    };
    const handleFileChange = (e) => {
        const data = e.target.files;
        const file = data[0];
        if (!file) return;
        setImage(file);
    };
    const createClinic = (imgName) => {
        const i = { ...clinicInfo };
        if (!i.contentHTML || !i.contentMarkdown || !i.name || !i.address) {
            alert("Chưa điền đủ thông tin");
            return;
        }
        const data = {
            name: i.name,
            descriptionHTML: i.contentHTML,
            descriptionMarkdown: i.contentMarkdown,
            address: i.address,
            image: imgName ? imgName : "",
        };
        createNewClinic(data).then((res) => {
            if (res && res.data) {
                if (res.data.statusCode === 0) {
                    setIsCreated(true);
                    setClinicInfo({
                        contentHTML: "",
                        contentMarkdown: "",
                        name: "",
                        address: "",
                    });
                    setImage(null);
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
            uploadClinicImage(formData).then((response) => {
                if (response && response.data) createClinic(response.data.name);
            });
        } else {
            createClinic();
        }
    };
    return (
        <>
            <div className="flex justify-between items-center mb-3">
                <h1 className="text-2xl uppercase font-semibold">
                    Thêm mới phòng khám
                </h1>
                <Button size="sm" onClick={handleSubmit}>
                    Lưu thông tin
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
                        <Label htmlFor="name" value="Tên phòng khám" />
                    </div>
                    <TextInput
                        placeholder="Nhập tên"
                        id="name"
                        type="text"
                        name="name"
                        value={clinicInfo.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="file" value="Hình ảnh phòng khám" />
                    </div>
                    <FileInput
                        id="file"
                        onChange={handleFileChange}
                        helperText="A profile picture is useful to confirm your clinic"
                    />
                </div>
            </div>
            <div className="mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="address" value="Địa chỉ phòng khám" />
                </div>
                <TextInput
                    placeholder="Nhập địa chỉ"
                    id="address"
                    type="text"
                    name="address"
                    value={clinicInfo.address}
                    onChange={handleChange}
                />
            </div>
            <Label value="Viết bài" />
            <MdEditor
                style={{ height: "500px", marginTop: 8 }}
                renderHTML={(text) => mdParser.render(text)}
                value={clinicInfo.contentMarkdown}
                onChange={handleEditorChange}
            />
        </>
    );
}

export default ClinicAdd;
