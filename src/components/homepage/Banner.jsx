import { useEffect, useState } from "react";
import { findAllNotification } from "../../api/notificationService";
import { dateOnly } from "../../utils/functions";
import { useNavigate } from "react-router-dom";

function Banner() {
  const [notification, setNotification] = useState([]);
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");
  const navi = useNavigate();
  useEffect(() => {
    findAllNotification().then((res) => {
      setNotification(
        res.data.filter(
          (item) =>
            new Date(item.to).getTime() >= dateOnly().getTime() &&
            new Date(item.from).getTime() <= dateOnly().getTime()
        )
      );
    });
  }, []);
  useEffect(() => {
    if (notification.length > 0) {
      let string = "";
      notification.forEach((element) => {
        string = `${string} ${element.title}: ${element.content} * `;
      });
      string = string.slice(0, -2);
      setText(string);
    }
  }, [notification]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query === "") return;
    navi("/search/" + query);
  };

  return (
    <div className="flex flex-col justify-between max-w-screen-xl mx-auto text-base bg-[url(assets/images/banner/header-bg.jpg)] bg-center bg-no-repeat bg-cover min-h-[600px]">
      <div className="banner-top py-16 bg-gradient-to-b from-[rgba(0,0,0,0.3)] to-transparent">
        <div className="text-center font-semibold text-3xl text-white">
          <h1 className="uppercase drop-shadow-lg">nền tảng y tế</h1>
          <h1 className="uppercase drop-shadow-lg">
            chăm sóc sức khoẻ toàn diện
          </h1>
        </div>
        <div className="flex justify-center items-center py-3 mt-4">
          <form method="get" onSubmit={handleSubmit}>
            <input
              className="bg-[rgba(255,255,255,0.5)] backdrop-blur py-3 px-8 rounded-full placeholder:text-sm border-none md:w-[400px]"
              type="search"
              placeholder="Tìm bác sĩ..."
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>
      </div>
      <div>
        <div className="py-6 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent">
          <div className="max-w-screen-lg mx-auto">
            <marquee
              scrolldelay="60"
              className="text-xl font-semibold text-yellow-200"
            >
              {text}
            </marquee>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
