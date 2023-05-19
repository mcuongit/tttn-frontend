import { Button } from "flowbite-react";
import { ArrowRightIcon } from "../../../utils/HeroIcon";
import { useEffect, useState } from "react";
import { findCatLimit } from "../../../api/categoryService";
import { Link, useNavigate } from "react-router-dom";

function CategoriesPosts() {
    const navi = useNavigate();
    const [lstCat, setLstCat] = useState([]);
    useEffect(() => {
        findCatLimit(6).then((res) => {
            setLstCat(res.data);
        });
    }, []);

    return (
        <section>
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-3xl font-bold tracking-tight uppercase">
                    danh mục bài viết
                </h1>
                <Button
                    onClick={() => navi("/post/category")}
                    size={"sm"}
                    color="light"
                >
                    <span className="mr-1">Xem thêm</span> <ArrowRightIcon />
                </Button>
            </div>
            <div className="grid grid-cols-6 gap-3">
                {lstCat &&
                    lstCat.length > 0 &&
                    lstCat.map((item) => {
                        return (
                            <Link
                                to={"/post/cat/" + item.slug}
                                className="flex justify-center items-center p-3 bg-purple-600 rounded-lg shadow-lg"
                                key={item.id}
                            >
                                <span className="text-center text-white font-bold hover:underline">
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
            </div>
        </section>
    );
}

export default CategoriesPosts;
