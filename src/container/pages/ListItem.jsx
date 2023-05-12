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
                    axios
                        .get(`${APP_URL}/home/get-top-doctor/10`)
                        .then((res) => {
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
            <section className="max-w-screen-xl mx-auto py-5">
                <div className="grid grid-cols-4 gap-5">
                    {list &&
                        list.length > 0 &&
                        list.map((item) => {
                            return (
                                <Link
                                    to={`/${items}/${item.id}`}
                                    key={item.id}
                                    className="hover:opacity-70 transition-all"
                                    title={item.name}
                                >
                                    <div className="flex rounded-lg border border-gray-200 bg-white shadow-md flex-col">
                                        <figure className="h-48 flex justify-center items-center">
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
                                            <div className="p-6 h-28">
                                                <h5 className="text-xl font-bold tracking-tight text-gray-900 overflow-hidden">
                                                    {item.firstName +
                                                        " " +
                                                        item.lastName}
                                                </h5>
                                                <span className="text-sm text-gray-500">
                                                    {item.positionData &&
                                                        item.positionData
                                                            .valueVi}
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="p-6 h-28">
                                                <h5 className="text-xl font-bold tracking-tight text-gray-900 overflow-hidden">
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
