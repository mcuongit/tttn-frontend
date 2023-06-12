import { TextInput } from "flowbite-react";
import CustomBreadcumb from "../../../components/common/CustomBreadcumb";
import { useEffect } from "react";
import { LETTER } from "../../../utils/functions";
import React, { useState } from "react";
import { findAllCategory } from "../../../api/categoryService";
import { Link } from "react-router-dom";

function Category() {
  const crumbs = [
    {
      name: "Trang chủ",
      link: "/",
    },
    {
      name: "Bài viết",
      link: "/post",
    },
    {
      name: "Danh mục bài viết",
      link: null,
    },
  ];
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    document.title = "Danh mục";
    findAllCategory().then((res) => {
      let data = [];
      res.data.forEach((element) => {
        let clone = { ...element };
        const firstLetter = element.name.charAt(0);
        clone.firstLetter = firstLetter;
        data.push(clone);
      });
      setCategories(data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section className="max-w-screen-lg mx-auto">
      <div className="md:mt-0 mt-16"></div>
      <div className="lg:px-0 px-2">
        <CustomBreadcumb crumbs={crumbs} />
      </div>
      <a
        href="#"
        className="fixed bottom-10 right-10 border-2 p-2 rounded-lg bg-gray-200"
      >
        Go top
      </a>
      <form
        className="lg:flex lg:justify-between block items-center my-3 lg:px-0 px-2"
        onSubmit={handleSubmit}
      >
        <h1 className="uppercase lg:text-2xl md:text-xl text-lg font-semibold">
          danh mục bài viết
        </h1>
        <TextInput type="search" placeholder="Tìm kiếm danh mục" />
      </form>
      <section className="my-3 lg:px-0 px-2">
        <details className="border mb-5 p-3 rounded-lg shadow-sm bg-white">
          <summary className="uppercase md:text-xl text-lg font-semibold">
            Tìm kiếm theo chữ cái
          </summary>
          <hr />
          <div className="pt-3 grid lg:grid-cols-12 md:grid-cols-8 grid-cols-6 gap-1  ">
            {LETTER.map((item, index) => {
              return (
                <a
                  key={index}
                  href={`#${item}`}
                  className="md:px-4 md:py-2 p-2 border font-semibold rounded text-center"
                >
                  {item}
                </a>
              );
            })}
          </div>
        </details>
        {LETTER.map((item, index) => {
          return (
            <div className="mb-7" key={index}>
              <div className="mb-3 w-12 h-12">
                <h2
                  id={item}
                  className="bg-blue-600 text-white h-full w-full flex justify-center items-center font-bold text-xl rounded"
                >
                  {item}
                </h2>
              </div>
              <div className="flex mb-3 flex-wrap gap-5 text-blue-500">
                {categories.map((row) => {
                  if (row.firstLetter === item)
                    return (
                      <Link
                        to={"/post/cat/" + row.slug}
                        className="border p-1 rounded bg-gray-50"
                        key={row.id}
                      >
                        {row.name}
                      </Link>
                    );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </section>
  );
}

export default Category;
