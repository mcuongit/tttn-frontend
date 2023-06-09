import { Alert, Button, Table, TextInput } from "flowbite-react";
import { useState } from "react";
import { findByMail } from "../../api/trackingService.js";
import { formatDate } from "../../utils/functions.js";

function Tracking() {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");
  const [isValid, setIsValid] = useState({ value: true, msg: "" });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      setIsValid({ value: false, msg: "Hãy nhập email" });
      setResponse("");
      return;
    }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = regex.test(email);
    if (!valid) {
      setIsValid({ value: false, msg: "Email không đúng định dạng" });
      setResponse(null);
      setError("Không có thông tin");
      return;
    }
    setIsValid({ value: true, msg: "" });
    findByMail(email)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((e) => {
        setError(e.response.data.message);
        setResponse(null);
      });
  };
  return (
    <section className="max-w-screen-lg my-3 mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-3">
        Tra cứu trạng thái lịch khám
      </h1>
      <form
        onSubmit={handleSubmit}
        method="GET"
        className="flex gap-x-2 max-w-screen-sm mx-auto mb-3"
      >
        <div className="grow">
          <TextInput
            type="search"
            placeholder="Nhập email để tra cứu"
            value={email}
            onChange={handleChange}
            color={isValid.value ? "gray" : "failure"}
            helperText={!isValid.value && isValid.msg}
          />
        </div>
        <Button type="submit">Tra cứu</Button>
      </form>
      {response !== "" && response !== null ? (
        <>
          <h3 className="mb-3 text-gray-500 text-sm">
            Hiển thị {response.bookingData.length} kết quả cho email{" "}
            <span className="text-blue-600">{email}</span>
          </h3>
          <Table striped>
            <Table.Head>
              <Table.HeadCell>Ngày đặt</Table.HeadCell>
              <Table.HeadCell>Bác sĩ</Table.HeadCell>
              <Table.HeadCell>Giờ</Table.HeadCell>
              <Table.HeadCell>Trạng thái</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {response.bookingData?.map((item) => {
                let name = "",
                  status = { color: "", msg: "" };
                if (item.doctorData) {
                  const { firstName, lastName } = item.doctorData;
                  name = `${firstName} ${lastName}`;
                }
                switch (item.statusId) {
                  case "S1":
                    status.color = "text-yellow-400";
                    status.msg = "Chưa xác nhận";
                    break;
                  case "S2":
                    status.color = "text-blue-600";
                    status.msg = "Đã xác nhận";
                    break;
                  case "S3":
                    status.color = "text-green-500";
                    status.msg = "Đã hoàn thành";
                    break;
                  case "S4":
                    status.color = "text-red-600";
                    status.msg = "Đã huỷ";
                    break;
                  default:
                    break;
                }
                return (
                  <Table.Row key={item.id} className="bg-white">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 ">
                      {formatDate(item.createdAt)}
                    </Table.Cell>
                    <Table.Cell className="font-medium text-gray-900">
                      {name}
                    </Table.Cell>
                    <Table.Cell>{item.allcodeData?.valueVi}</Table.Cell>
                    <Table.Cell className={status.color}>
                      {status.msg}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </>
      ) : response === "" ? (
        <Alert color={"info"}>
          <span>Nhập email và nhấn tìm kiếm</span>
        </Alert>
      ) : (
        <>
          <Alert color={"failure"}>
            <span>{error}</span>
          </Alert>
        </>
      )}
    </section>
  );
}

export default Tracking;
