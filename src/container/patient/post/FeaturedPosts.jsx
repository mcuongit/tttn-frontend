import { useEffect, useState } from "react";
import { findPostLimit } from "../../../api/postService";
import { Link } from "react-router-dom";
import { IMAGE_LINK } from "../../../utils/constant";

function FeaturedPosts() {
    const [lstPost, setLstPost] = useState([]);
    useEffect(() => {
        findPostLimit(2).then((res) => {
            setLstPost(res.data);
        });
    }, []);
    return (
        <section>
            <h1 className="text-3xl font-bold tracking-tight uppercase mb-3">
                bài viết nổi bật
            </h1>
            <div className="grid grid-cols-2 gap-3">
                {lstPost &&
                    lstPost.length > 0 &&
                    lstPost.map((item) => {
                        return (
                            <Link
                                to={"/post-detail/" + item.id}
                                key={item.id}
                                className="grid grid-cols-2 rounded-lg border shadow-md bg-white hover:opacity-80 transition-all"
                            >
                                <img
                                    src={IMAGE_LINK.post + "/" + item.image}
                                    alt={item.image}
                                    className="w-full h-auto border-r-2 rounded-l-lg object-cover"
                                />
                                <h5
                                    style={{ lineClamp: 1 }}
                                    className="p-3 text-2xl font-bold tracking-tight text-gray-900  hover:underline"
                                >
                                    {item.title}
                                </h5>
                            </Link>
                        );
                    })}
            </div>
        </section>
    );
}

export default FeaturedPosts;
