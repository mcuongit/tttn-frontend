import {
    Button,
    Card,
    Label,
    Select,
    TextInput,
    Textarea,
} from "flowbite-react";
import { useState } from "react";
import { dateOnly, formatDateYmd } from "../../utils/functions";
import {
    findOneNotification,
    updateNotification,
} from "../../api/notificationService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function EditNotification() {
    const { id } = useParams();
    useEffect(() => {
        document.title = "Sửa thông báo";
        findOneNotification(id).then((res) => {
            let _data = { ...res.data };
            _data.from = formatDateYmd(_data.from);
            _data.to = formatDateYmd(_data.to);
            setData(_data);
        });
    }, []);

    const naviagte = useNavigate();
    const [data, setData] = useState({
        type: "normal",
        title: "",
        content: "",
        from: "",
        to: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { from, to } = data;
        const _data = {
            ...data,
            from: dateOnly(from).getTime(),
            to: dateOnly(to).getTime(),
        };
        updateNotification(id, _data).then((res) => {
            if (res.data.statusCode === 0) naviagte("/admin/notification");
        });
    };
    return (
        <section>
            <div className="mb-5">
                <h1 className="text-2xl uppercase font-semibold">
                    Thêm thông báo
                </h1>
            </div>
            <div className="max-w-lg mx-auto">
                <Card>
                    <form
                        className="flex flex-col gap-4"
                        method="post"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="type" value="Loại thông báo" />
                            </div>
                            <Select
                                id="type"
                                name="type"
                                required
                                value={data.type}
                                onChange={handleChange}
                            >
                                <option value="important">Quan trọng</option>
                                <option value="normal">
                                    Thông báo thông thường
                                </option>
                                <option value="default">
                                    Thông báo mặc định
                                </option>
                            </Select>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="title"
                                    value="Tiêu đề thông báo"
                                />
                            </div>
                            <TextInput
                                id="title"
                                type="text"
                                name="title"
                                placeholder="Nhập tiêu đề thông báo"
                                required={true}
                                value={data.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="content"
                                    value="Nội dung thông báo"
                                />
                            </div>
                            <Textarea
                                id="content"
                                name="content"
                                placeholder="Nhập nội dung thông báo..."
                                required={true}
                                rows={4}
                                value={data.content}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="from" value="Ngày bắt đầu" />
                            </div>
                            <input
                                type="date"
                                name="from"
                                id="from"
                                value={data.from}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 text-gray-900 bg-gray-50 rounded-lg p-2.5 text-sm"
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="to" value="Ngày bắt đầu" />
                            </div>
                            <input
                                type="date"
                                name="to"
                                id="to"
                                value={data.to}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 text-gray-900 bg-gray-50 rounded-lg p-2.5 text-sm"
                            />
                        </div>
                        <Button type="submit">Lưu</Button>
                    </form>
                </Card>
            </div>
        </section>
    );
}

export default EditNotification;
