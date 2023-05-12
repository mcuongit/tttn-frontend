import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { createCategory } from "../../api/categoryService";
import { useNavigate } from "react-router-dom";

function AddCategory() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
    });
    const handleChange = (e) => {
        setData({
            ...data,
            name: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        createCategory(data).then(() => {
            navigate("/admin/category");
        });
    };
    return (
        <section>
            <div className="mb-5 flex justify-between items-center">
                <h1 className="text-2xl uppercase font-semibold">
                    Thêm danh mục
                </h1>
            </div>
            <form
                className="max-w-lg mx-auto rounded-lg shadow p-5"
                onSubmit={handleSubmit}
            >
                <div className="mb-2">
                    <Label htmlFor="name" value="Tên danh mục" />
                </div>
                <TextInput
                    type="text"
                    id="name"
                    required
                    placeholder="Nhập tên danh mục"
                    value={data.name}
                    onChange={handleChange}
                />
                <Button type="submit" className="mt-3 w-full" size={"sm"}>
                    Lưu danh mục
                </Button>
            </form>
        </section>
    );
}

export default AddCategory;
