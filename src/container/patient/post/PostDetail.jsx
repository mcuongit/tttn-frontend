import { useState } from "react";
import CustomBreadcumb from "../../../components/common/CustomBreadcumb";
import { useEffect } from "react";
import { findOnePost } from "../../../api/postService";
import { useParams } from "react-router-dom";

function PostDetail() {
  const { id } = useParams();
  const crumbs = [
    {
      name: "Trang chủ",
      link: "/",
    },
    {
      name: "Bài viết",
      link: null,
    },
  ];
  const [postData, setPostData] = useState({
    html: "",
  });
  useEffect(() => {
    findOnePost(id).then((res) => {
      document.title = res.data.title;
      setPostData(res.data);
    });
  }, []);

  return (
    <section className="max-w-screen-lg mx-auto py-3">
      <CustomBreadcumb crumbs={crumbs} />
      <div className="py-5">
        <article
          className="prose mx-auto"
          dangerouslySetInnerHTML={{ __html: postData.html }}
        />
      </div>
    </section>
  );
}

export default PostDetail;
