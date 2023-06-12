import CustomBreadcumb from "../../../components/common/CustomBreadcumb";
import CategoriesPosts from "./CategoriesPosts";
import FeaturedPosts from "./FeaturedPosts";
import LastestPost from "./LastestPost";
import s1 from "../../../assets/svg/undraw_doctors_p6aq.svg";
import s2 from "../../../assets/svg/undraw_content_re_33px.svg";
import s3 from "../../../assets/svg/undraw_updates_re_o5af.svg";
import s4 from "../../../assets/svg/undraw_medicine_b-1-ol.svg";

function Post() {
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
  return (
    <section className="max-w-screen-lg mx-auto my-5">
      <div className="md:mt-0 mt-16"></div>
      <div className="lg:px-0 px-2">
        <CustomBreadcumb crumbs={crumbs} />
      </div>
      <div className="lg:py-10 py-5">
        <LastestPost />
      </div>
      <div className="lg:py-10 py-5">
        <FeaturedPosts />
      </div>
      <div className="lg:py-10 py-5">
        <CategoriesPosts />
      </div>
      <div className="lg:py-10 py-5 lg:px-0 px-2">
        <h1 className="lg:text-3xl md:text-2xl text-xl font-bold tracking-tight uppercase mb-3">
          Chúng tôi tạo ra nội dung như thế nào?
        </h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-10 md:gap-5 gap-3 bg-cyan-200 lg:p-10 p-5">
          <div>
            <img className="h-52 w-auto" src={s1} alt="" />
            <p className="text-center mt-9 text-lg font-semibold">
              Tham vấn y khoa với bác sĩ chuyên môn
            </p>
          </div>
          <div>
            <img className="h-52 w-auto" src={s2} alt="" />
            <p className="text-center mt-9 text-lg font-semibold">
              Nội dung xác thực
            </p>
          </div>
          <div>
            <img className="h-52 w-auto" src={s3} alt="" />
            <p className="text-center mt-9 text-lg font-semibold">
              Cập nhật thường xuyên
            </p>
          </div>
          <div>
            <img className="h-52 w-auto" src={s4} alt="" />
            <p className="text-center mt-9 text-lg font-semibold">
              Tham khảo nguồn tin cậy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Post;
