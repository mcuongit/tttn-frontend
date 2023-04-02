import { Alert, Button, Label, Textarea } from "flowbite-react";
import MarkdownIt from "markdown-it";
import { useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import CustomBreadcumb from "../../../components/common/CustomBreadcumb";
import { useEffect } from "react";
import { getAllDoctor, saveDoctorInfo } from "../../../api/userService";

function MagangeDoctor() {
    const [contentMarkdown, setContentMarkdown] = useState("");
    const [contentHTML, setContentHTML] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [description, setDescription] = useState("");
    const [doctorsList, setDoctorsList] = useState([]);
    const [optionsList, setOptionsList] = useState([]);
    const [isSaved, setIsSaved] = useState({
        isSaved: false,
        message: null,
        color: null,
    });
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    // berfore run
    useEffect(() => {
        getAllDoctor("get-all")
            .then((res) => {
                setDoctorsList(res.data.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    useEffect(() => {
        if (doctorsList.length > 0) {
            let options = [];
            doctorsList.forEach((item) => {
                const o = {
                    value: item.id,
                    label: `${item.firstName} ${item.lastName}`,
                };
                options.push(o);
            });
            setOptionsList(options);
        }
    }, [doctorsList]);

    function handleEditorChange({ html, text }) {
        setContentHTML(html);
        setContentMarkdown(text);
    }

    const handleChange = (selectedOption) => {
        setSelectedDoctor(selectedOption);
    };

    const handleDescChange = (e) => {
        const { value } = e.target;
        setDescription(value);
    };

    const handleSubmit = () => {
        const s = {
            contentMarkdown,
            contentHTML,
            doctorId: selectedDoctor.value,
            description,
        };
        const a = Object.keys(s);
        for (let index = 0; index < a.length; index++) {
            const element = a[index];
            if (!s[element]) {
                alert(`Chưa có thuộc tính: ${element}`);
                return;
            }
        }
        saveDoctorInfo("save-doctor-info", s)
            .then((res) => {
                console.log(res);
                if (res.data.statusCode !== 0) {
                    setIsSaved({
                        ...isSaved,
                        isSaved: false,
                    });
                    return;
                }
                setIsSaved({
                    isSaved: true,
                    message: "Thêm thành công",
                    color: "success",
                });
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const crumbs = [
        { name: "Trang chủ", link: "/admin" },
        { name: "Tài khoản", link: "/admin/users/manage" },
        { name: "Quản lý bác sĩ", link: undefined },
    ];

    return (
        <div>
            <div className="mb-3">
                <CustomBreadcumb crumbs={crumbs} />
            </div>
            <div className="flex justify-between items-center mb-5">
                <h1 className="uppercase font-semibold text-2xl">
                    thêm thông tin bác sĩ
                </h1>
                <Button onClick={handleSubmit}>Lưu thông tin</Button>
            </div>
            {isSaved.isSaved && (
                <div className="mb-3">
                    <Alert
                        color="success"
                        onDismiss={function onDismiss() {
                            return setIsSaved({ ...isSaved, isSaved: false });
                        }}
                    >
                        <span>Thêm thành công</span>
                    </Alert>
                </div>
            )}

            <div className="mb-3">
                <Label htmlFor="doctor" value="Chọn bác sĩ" />
                <Select
                    className="my-2 w-1/2"
                    id="doctor"
                    value={selectedDoctor}
                    onChange={handleChange}
                    options={optionsList}
                />
                <div id="textarea">
                    <div className="mb-2 block">
                        <Label htmlFor="comment" value="Thông tin giới thiệu" />
                    </div>
                    <Textarea
                        id="comment"
                        placeholder="Viết thông tin giới thiệu..."
                        required={true}
                        rows={4}
                        value={description}
                        onChange={(e) => handleDescChange(e)}
                    />
                </div>
            </div>
            <Label value="Viết bài" />
            <MdEditor
                style={{ height: "500px", marginTop: 8 }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
            />
        </div>
    );
}

export default MagangeDoctor;
