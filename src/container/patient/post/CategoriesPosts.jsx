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
    <section className="lg:px-0 px-2">
      <div className="flex justify-between items-center mb-5">
        <h1 className="lg:text-3xl md:text-2xl text-xl font-bold tracking-tight uppercase">
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
      <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-3">
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
