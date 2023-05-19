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
        <section className="max-w-screen-xl mx-auto my-5">
            <CustomBreadcumb crumbs={crumbs} />
            <div className="py-10">
                <LastestPost />
            </div>
            <div className="py-10">
                <FeaturedPosts />
            </div>
            <div className="py-10">
                <CategoriesPosts />
            </div>
            <div className="py-10">
                <h1 className="text-3xl font-bold tracking-tight uppercase mb-3">
                    Chúng tôi tạo ra nội dung như thế nào?
                </h1>
                <div className="grid grid-cols-4 gap-10 bg-cyan-200 p-10">
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
