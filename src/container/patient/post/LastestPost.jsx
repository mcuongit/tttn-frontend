import { useEffect, useState } from "react";
import { findPostLimit } from "../../../api/postService";
import { Link } from "react-router-dom";
import { IMAGE_LINK } from "../../../utils/constant";

function LastestPost() {
  const [lstPost, setLstPost] = useState([]);
  useEffect(() => {
    findPostLimit(4).then((res) => {
      setLstPost(res.data);
    });
  }, []);

  return (
    <section className="lg:px-0 px-2">
      <h1 className="lg:text-3xl md:text-2xl text-xl font-bold tracking-tight uppercase mb-3">
        bài viết mới nhất
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3">
        {lstPost &&
          lstPost.length > 0 &&
          lstPost.map((item) => {
            return (
              <Link
                to={"/post-detail/" + item.id}
                key={item.id}
                className="block rounded-lg border shadow-md bg-white hover:opacity-80 transition-all"
              >
                <img
                  src={IMAGE_LINK.post + "/" + item.image}
                  alt={item.image}
                  className="w-full h-auto rounded-t-lg object-cover"
                />
                <h5
                  style={{ lineClamp: 1 }}
                  className="lg:text-2xl md:text-xl text-lg p-3 font-bold tracking-tight text-gray-900 hover:underline"
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

export default LastestPost;
