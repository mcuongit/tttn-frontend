import { Alert, Button, Label, TextInput, Textarea } from "flowbite-react";
import MarkdownIt from "markdown-it";
import { useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { Select as Sl } from "flowbite-react";
import Select from "react-select";
import CustomBreadcumb from "../../../components/common/CustomBreadcumb";
import { useEffect } from "react";
import { getMarkdown } from "../../../api/userService";
import { docTitle } from "../../../utils/constant";
import { getAllCodeType } from "../../../api/allcodeApi";
import {
    createDoctorInfo,
    getAllDoctor,
    getMoreDoctorInfo,
    saveDoctorInfo,
} from "../../../api/doctorService";
import { getAllSpecs } from "../../../api/specialtyService";
import { findAllClinic } from "../../../api/clinicService";

function MagangeDoctor() {
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [doctorsList, setDoctorsList] = useState([]);
    const [optionsList, setOptionsList] = useState([]);
    const [markdownContent, setMarkdownContent] = useState({
        contentMarkdown: "",
        contentHTML: "",
        doctorId: "",
        description: "",
    });
    const [isSaved, setIsSaved] = useState({
        isSaved: false,
        message: null,
        color: null,
    });
    const [doctorInfo, setDoctorInfo] = useState({
        price: [],
        province: [],
        payment: [],
        specialty: [],
        clinic: [],
    });
    const initState = {
        priceId: "",
        provinceId: "",
        paymentId: "",
        addressClinic: "",
        nameClinic: "",
        note: "",
        specialtyId: "",
        clinicId: "",
    };
    const [toSaveInfo, setToSaveInfo] = useState(initState);

    const mdParser = new MarkdownIt(/* Markdown-it options */);

    // berfore run
    useEffect(() => {
        document.title = docTitle.ADMIN.doctor_manage;
        getAllDoctor("get-all")
            .then((res) => {
                setDoctorsList(res.data.data);
            })
            .catch((e) => {
                console.log(e);
            });
        allCodeData();
    }, []);

    const allCodeData = () => {
        let copyState = { ...doctorInfo };
        getAllCodeType("PRICE").then((res) => {
            copyState.price = [...res.data.data];
        });
        getAllCodeType("PAYMENT").then((res) => {
            copyState.payment = [...res.data.data];
        });
        getAllCodeType("PROVINCE").then((res) => {
            copyState.province = [...res.data.data];
        });
        getAllSpecs().then((res) => {
            copyState.specialty = [...res.data];
        });
        findAllClinic().then((res) => {
            copyState.clinic = [...res.data];
        });
        setDoctorInfo(copyState);
    };

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
        setMarkdownContent({
            ...markdownContent,
            contentHTML: html,
            contentMarkdown: text,
        });
    }

    const handleChange = (selectedOption) => {
        const { value } = selectedOption;
        getMarkdown(value).then((res) => {
            if (res && res.data && res.data.data) {
                const { contentHTML, contentMarkdown, description } =
                    res.data.data;
                setMarkdownContent({
                    ...markdownContent,
                    contentHTML,
                    contentMarkdown,
                    description,
                });
            } else {
                setMarkdownContent({
                    ...markdownContent,
                    contentHTML: "",
                    contentMarkdown: "",
                    description: "",
                });
            }
        });
        getMoreDoctorInfo(value).then((res) => {
            if (res && res.data && res.data.data) setToSaveInfo(res.data.data);
            if (!res.data.data) {
                setToSaveInfo(initState);
            }
        });
        setSelectedDoctor(selectedOption);
        setMarkdownContent({
            ...markdownContent,
            doctorId: value,
        });
    };

    const handleDescChange = (e) => {
        const { value } = e.target;
        setMarkdownContent({
            ...markdownContent,
            description: value,
        });
    };

    const validate = () => {
        let s = { ...markdownContent, doctorId: selectedDoctor.value };
        const a = Object.keys(s);
        for (let index = 0; index < a.length; index++) {
            const element = a[index];
            if (!s[element]) {
                alert(`Chưa có thuộc tính: ${element}`);
                return false;
            }
        }
        const b = Object.keys(initState);
        for (let index = 0; index < b.length; index++) {
            const element = b[index];
            if (!toSaveInfo[element]) {
                alert(`Chưa có thuộc tính: ${element}`);
                return false;
            }
        }
        return true;
    };

    const handleSubmit = () => {
        const { value } = selectedDoctor;
        let s = { ...markdownContent, doctorId: value };
        if (!validate()) return;
        let copyState = { ...toSaveInfo, doctorId: value };
        createDoctorInfo(copyState).then((res) => {
            console.log("to save info: ", res);
        });
        saveDoctorInfo("save-doctor-info", s)
            .then((res) => {
                if (res.data.statusCode !== 0) {
                    setIsSaved({
                        ...isSaved,
                        isSaved: false,
                    });
                    return;
                }
                setIsSaved({
                    isSaved: true,
                    message: "Lưu thành công",
                    color: "success",
                });
            })
            .catch((e) => {
                console.error(e);
                setIsSaved({
                    isSaved: true,
                    message: "Lưu thành công",
                    color: "success",
                });
            });
    };

    const handleInfoChange = (e) => {
        const { value, name } = e.target;
        setToSaveInfo({
            ...toSaveInfo,
            [name]: value,
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
                        color={isSaved.color}
                        onDismiss={function onDismiss() {
                            return setIsSaved({ ...isSaved, isSaved: false });
                        }}
                    >
                        <span>{isSaved.message}</span>
                    </Alert>
                </div>
            )}

            <div className="mb-3">
                <div className="flex gap-x-2 mb-3">
                    <div className="basis-1/3">
                        <Label htmlFor="doctor" value="Chọn bác sĩ" />
                        <Select
                            id="doctor"
                            value={selectedDoctor}
                            onChange={handleChange}
                            options={optionsList}
                        />
                    </div>
                    <div className="basis-1/3">
                        <Label htmlFor="spec" value="Chuyên khoa" />
                        <Sl
                            id="spec"
                            name="specialtyId"
                            value={toSaveInfo.specialtyId}
                            onChange={(e) => {
                                handleInfoChange(e);
                            }}
                        >
                            <option>Chọn chuyên khoa...</option>
                            {doctorInfo &&
                                doctorInfo.specialty &&
                                doctorInfo.specialty.map((item) => {
                                    return (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                        </Sl>
                    </div>
                    <div className="basis-1/3">
                        <Label htmlFor="clinic" value="Phòng khám" />
                        <Sl
                            id="clinic"
                            name="clinicId"
                            value={toSaveInfo.clinicId}
                            onChange={(e) => {
                                handleInfoChange(e);
                            }}
                        >
                            <option value="">Chọn phòng khám</option>
                            {doctorInfo &&
                                doctorInfo.clinic &&
                                doctorInfo.clinic.map((item) => {
                                    return (
                                        <option value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                        </Sl>
                    </div>
                </div>
                <div className="flex flex-wrap">
                    <div className="basis-1/3 px-2 mb-3">
                        <div className="mb-2 block">
                            <Label htmlFor="price" value="Giá khám" />
                        </div>
                        <Sl
                            id="price"
                            name="priceId"
                            value={toSaveInfo.priceId}
                            onChange={(e) => {
                                handleInfoChange(e);
                            }}
                        >
                            <option value="">Chọn giá khám...</option>
                            {doctorInfo &&
                                doctorInfo.price &&
                                doctorInfo.price.map((item) => {
                                    return (
                                        <option key={item.id} value={item.key}>
                                            {item.valueVi}
                                        </option>
                                    );
                                })}
                        </Sl>
                    </div>
                    <div className="basis-1/3 px-2 mb-3">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="pay"
                                value="Phương thức thanh toán"
                            />
                        </div>
                        <Sl
                            id="pay"
                            name="paymentId"
                            value={toSaveInfo.paymentId}
                            onChange={(e) => {
                                handleInfoChange(e);
                            }}
                        >
                            <option>Chọn phương thức thanh toán...</option>
                            {doctorInfo &&
                                doctorInfo.payment &&
                                doctorInfo.payment.map((item) => {
                                    return (
                                        <option key={item.id} value={item.key}>
                                            {item.valueVi}
                                        </option>
                                    );
                                })}
                        </Sl>
                    </div>
                    <div className="basis-1/3 px-2 mb-3">
                        <div className="mb-2 block">
                            <Label htmlFor="province" value="Tỉnh thành" />
                        </div>
                        <Sl
                            id="province"
                            name="provinceId"
                            value={toSaveInfo.provinceId}
                            onChange={(e) => {
                                handleInfoChange(e);
                            }}
                        >
                            <option>Chọn tỉnh thành...</option>
                            {doctorInfo &&
                                doctorInfo.province &&
                                doctorInfo.province.map((item) => {
                                    return (
                                        <option key={item.id} value={item.key}>
                                            {item.valueVi}
                                        </option>
                                    );
                                })}
                        </Sl>
                    </div>
                    <div className="basis-1/3 px-2 mb-3">
                        <div className="mb-2 block">
                            <Label htmlFor="clinic" value="Tên phòng khám" />
                        </div>
                        <TextInput
                            id="clinic"
                            type="text"
                            name="nameClinic"
                            value={toSaveInfo.nameClinic}
                            placeholder="Nhập tên phòng khám"
                            required={true}
                            onChange={(e) => {
                                handleInfoChange(e);
                            }}
                        />
                    </div>
                    <div className="basis-1/3 px-2 mb-3">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="addressDoctor"
                                value="Địa chỉ phòng khám"
                            />
                        </div>
                        <TextInput
                            id="addressDoctor"
                            type="text"
                            name="addressClinic"
                            value={toSaveInfo.addressClinic}
                            placeholder="Nhập địa chỉ"
                            required={true}
                            onChange={(e) => {
                                handleInfoChange(e);
                            }}
                        />
                    </div>
                    <div className="basis-1/3 px-2 mb-3">
                        <div className="mb-2 block">
                            <Label htmlFor="note" value="Ghi chú" />
                        </div>
                        <TextInput
                            type="text"
                            name="note"
                            value={toSaveInfo.note}
                            id="note"
                            placeholder="Nhập ghi chú"
                            required={true}
                            onChange={(e) => {
                                handleInfoChange(e);
                            }}
                        />
                    </div>
                </div>
                <div id="textarea">
                    <div className="mb-2 block">
                        <Label htmlFor="comment" value="Thông tin giới thiệu" />
                    </div>
                    <Textarea
                        id="comment"
                        placeholder="Viết thông tin giới thiệu..."
                        required={true}
                        rows={4}
                        value={markdownContent.description}
                        onChange={(e) => handleDescChange(e)}
                    />
                </div>
            </div>
            <Label value="Viết bài" />
            <MdEditor
                style={{ height: "500px", marginTop: 8 }}
                renderHTML={(text) => mdParser.render(text)}
                value={markdownContent.contentMarkdown}
                onChange={handleEditorChange}
            />
        </div>
    );
}

export default MagangeDoctor;
