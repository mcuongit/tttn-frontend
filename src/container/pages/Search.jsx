import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { searchDoctor } from "../../api/searchService";
import { Avatar, Button, Card } from "flowbite-react";

function Search() {
  const { query } = useParams();
  const [result, setResult] = useState([]);
  useEffect(() => {}, []);

  useEffect(() => {
    if (query) {
      searchDoctor(query).then((res) => {
        setResult(res.data);
      });
    }
  }, [query]);

  return (
    <section className="py-10 max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-semibold">
        Kết quả tìm kiếm cho: <span className="text-blue-600">{query}</span>
      </h1>
      <div className="grid grid-cols-4 gap-3 mt-5">
        {result.length > 0 ? (
          result.map((item) => {
            return (
              <Card key={item.id}>
                <div className="flex flex-col items-center pb-7">
                  <Avatar
                    img={
                      item.image
                        ? `${import.meta.env.VITE_BACKEND_URL}/users/avatar/${
                            item.image
                          }`
                        : ""
                    }
                    rounded={true}
                    bordered={true}
                    size="xl"
                  />
                  <h5 className="mt-3 mb-1 text-xl font-medium text-gray-900 truncate tracking-tight">
                    {item.firstName + " " + item.lastName}
                  </h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.positionData?.valueVi}
                  </span>
                  <div className="mt-4 flex space-x-3 lg:mt-6">
                    <Button size="sm">
                      <Link to={`/doctor/${item.id}`}>Xem thông tin</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <span>Không có thông tin</span>
        )}
      </div>
    </section>
  );
}

export default Search;
