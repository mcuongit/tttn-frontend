import React, { useState } from "react";
import { IMAGE_LINK, PAGE_TYPE } from "../../utils/constant";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "../../utils/HeroIcon";
import { useEffect } from "react";
import { findPostLimit } from "../../api/postService";
import { Button } from "flowbite-react";

function HandBook() {
  const [lstPost, setLstPost] = useState([]);
  useEffect(() => {
    findPostLimit().then((res) => {
      setLstPost(res.data);
    });
  }, []);
  const navi = useNavigate();

  return (
    <section className="py-10 bg-gray-100 md:px-0 px-2">
      <section className="max-w-screen-lg mx-auto my-3 ">
        <div className="flex justify-between items-center mb-5">
          <h1 className="lg:text-3xl text-2xl tracking-tight font-bold">
            Cẩm nang
          </h1>
          <Button onClick={() => navi(PAGE_TYPE.post)} size={"sm"} color="gray">
            <span className="mr-1 md:text-base text-xs">Tất cả bài viết</span>{" "}
            <ArrowRightIcon className="md:w-6 md:h-6 w-4 h-4" />
          </Button>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
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
                  className="md:text-2xl text-lg font-bold tracking-tight text-gray-900 mt-3 hover:underline"
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
