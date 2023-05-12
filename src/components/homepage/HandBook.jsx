import React, { useState } from "react";
import { IMAGE_LINK, PAGE_TYPE } from "../../utils/constant";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "../../utils/HeroIcon";
import { useEffect } from "react";
import { findPostLimit } from "../../api/postService";

function HandBook() {
    const [lstPost, setLstPost] = useState([]);
    useEffect(() => {
        findPostLimit().then((res) => {
            setLstPost(res.data);
        });
    }, []);

    return (
        <section className="py-10 bg-gray-100">
            <section className="max-w-screen-xl mx-auto my-3 ">
                <div className="flex justify-between items-center mb-5">
                    <h1 className="text-3xl font-semibold">Cẩm nang</h1>
                    <Link
                        to={PAGE_TYPE.category}
                        className="flex gap-x-1 hover:underline text-blue-700"
                    >
                        <span>Xem thêm</span> <ArrowRightIcon />
                    </Link>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    {lstPost.length > 0 &&
                        lstPost.map((item, index) => (
                            <Link
                                to={"post-detail/" + item.id}
                                key={index}
                                className="block rounded-lg shadow-md p-5 bg-white hover:opacity-80 transition-all"
                            >
                                <img
                                    src={IMAGE_LINK.post + "/" + item.image}
                                    alt={item.image}
                                    className="w-full h-auto mb-3"
                                />
                                <h5
                                    style={{ lineClamp: 1 }}
                                    className="text-2xl font-bold tracking-tight text-gray-900 mt-3 hover:underline"
                                >
                                    {item.title}
                                </h5>
                            </Link>
                        ))}
                </div>
            </section>
        </section>
    );
}

export default HandBook;
