import { useEffect, useState } from "react";
import CustomBreadcumb from "../../../components/common/CustomBreadcumb";
import { Link, useParams } from "react-router-dom";
import { findPostByCatSlug } from "../../../api/postService";
import { IMAGE_LINK } from "../../../utils/constant";

function CategoryDetail() {
  const crumbs = [
    {
      name: "Trang chủ",
      link: "/",
    },
    {
      name: "Danh mục",
      link: null,
    },
  ];
  const { slug } = useParams();
  const [lstPosts, setLstPosts] = useState([]);
  const [title, setTitle] = useState("Không có dữ liệu");
  useEffect(() => {
    findPostByCatSlug(slug).then((res) => {
      setLstPosts(res.data);
      if (res.data.length > 0) {
        document.title = res.data[0].categoryData.name;
        setTitle(res.data[0].categoryData.name);
      }
    });
  }, [slug]);

  return (
    <section className="max-w-screen-lg mx-auto py-5">
      <div className="mb-5">
        <CustomBreadcumb crumbs={crumbs} />
      </div>
      <div className="mb-3">
        <h1 className="text-3xl text-gray-800 tracking-tight font-bold">
          {title}
        </h1>
      </div>
      <p className="text-gray-600 mb-5 text-sm">
        {title !== "Không có dữ liệu" &&
          "Tổng hợp danh sách bác sĩ chuyên khoa giỏi, địa chỉ uy tín, kinh nghiệm đi khám và điều trị hiệu quả bệnh lý " +
            title}
      </p>
      <ul>
        {lstPosts &&
          lstPosts.length > 0 &&
          lstPosts.map((item) => {
            return (
              <li>
                <Link
                  to={"/post-detail/" + item.id}
                  key={item.id}
                  className="grid grid-cols-4 rounded-lg border shadow-md bg-white hover:opacity-80 transition-all"
                >
                  <img
                    src={IMAGE_LINK.post + "/" + item.image}
                    alt={item.image}
                    className="w-full h-auto border-r-2 rounded-l-lg object-cover"
                  />
                  <h5
                    style={{ lineClamp: 1 }}
                    className="p-3 text-2xl font-bold tracking-tight text-gray-900 hover:underline col-span-3"
                  >
                    {item.title}
                  </h5>
                </Link>
              </li>
            );
          })}
      </ul>
    </section>
  );
}

export default CategoryDetail;
