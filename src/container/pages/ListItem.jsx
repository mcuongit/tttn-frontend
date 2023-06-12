import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { APP_URL } from "../../api/_configApi";

function ListItem() {
  const [searchParams] = useSearchParams();
  const items = searchParams.get("items");
  const [list, setList] = useState([]);
  const [clsName, setClsName] = useState("");
  const [img, setImg] = useState("");
  useEffect(() => {
    if (items) {
      switch (items) {
        case "clinic":
          setClsName("rounded-t-lg h-full w-auto object-contain");
          axios.get(`${APP_URL}/${items}`).then((res) => {
            if (res.data) setList(res.data);
          });
          setImg(null);
          break;
        case "specialty":
          setClsName("rounded-t-lg w-full object-cover");
          axios.get(`${APP_URL}/${items}`).then((res) => {
            if (res.data) setList(res.data);
          });
          setImg(null);

          break;
        case "doctor":
          setClsName("rounded-t-lg w-full h-full object-cover");
          axios.get(`${APP_URL}/home/get-top-doctor/10`).then((res) => {
            if (res.data) {
              setList(res.data);
              setImg(`${APP_URL}/users/avatar`);
            }
          });
          break;
        default:
          break;
      }
    }
  }, [items]);

  return (
    <div className="bg-gray-100">
      <div className="md:mt-0 mt-10"></div>
      <section className="max-w-screen-lg mx-auto py-5 px-2">
        <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-5 md:gap-3 gap-2">
          {list &&
            list.length > 0 &&
            list.map((item) => {
              return (
                <Link
                  to={`/${items}/${item.id}`}
                  key={item.id}
                  className="hover:opacity-70 transition-all border"
                  title={item.name}
                >
                  <div className="flex rounded-lg border border-gray-200 bg-white shadow-md flex-col">
                    <figure className="lg:h-48 h-28 flex justify-center items-center">
                      <img
                        className={clsName}
                        src={
                          img
                            ? `${img}/${item.image}`
                            : `${APP_URL}/${items}/image/${item.image}`
                        }
                        alt={item.image}
                      />
                    </figure>

                    {img ? (
                      <div className="lg:p-6 p-3 lg:h-28 h-auto">
                        <h5 className="md:text-xl text-sm md:font-bold font-semibold tracking-tight text-gray-900 overflow-hidden">
                          {item.firstName + " " + item.lastName}
                        </h5>
                        <span className="text-sm text-gray-500">
                          {item.positionData && item.positionData.valueVi}
                        </span>
                      </div>
                    ) : (
                      <div className="lg:p-6 p-3 lg:h-28 h-auto">
                        <h5 className="md:text-xl text-lg md:font-bold font-semibold tracking-tight text-gray-900 truncate">
                          {item.name}
                        </h5>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
        </div>
      </section>
    </div>
  );
}

export default ListItem;
