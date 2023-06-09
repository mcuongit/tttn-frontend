import { useState } from "react";
import { useEffect } from "react";
import { findAllContact, removeContact } from "../../api/contactService";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

function AllContact() {
  const [contactList, setContactList] = useState([]);
  useEffect(() => {
    document.title = "Tất cả liên hệ";
    findAllContact().then((res) => {
      setContactList(res.data);
    });
  }, []);
  const handleDelete = (id) => {
    removeContact(id).then(() => {
      setContactList(contactList.filter((item) => item.id !== id));
      alert("Xoá thành công");
    });
  };

  return (
    <section>
      <h1 className="text-2xl uppercase font-semibold tracking-tight mb-3">
        Quản lý liên hệ
      </h1>
      <Table>
        <Table.Head>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Tên</Table.HeadCell>
          <Table.HeadCell>Nội dung</Table.HeadCell>
          <Table.HeadCell>Trạng thái</Table.HeadCell>
          <Table.HeadCell>Hành động</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {contactList.length > 0 ? (
            contactList.map((item) => {
              return (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={item.id}
                >
                  <Table.Cell>{item.email}</Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell className="max-w-xs truncate">
                    {item.comment}
                  </Table.Cell>
                  <Table.Cell
                    className={
                      item.statusCode === 0
                        ? "text-yellow-400"
                        : "text-green-400"
                    }
                  >
                    {item.statusCode === 0 ? "Chưa trả lời" : "Đã trả lời"}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-x-5">
                      <Link
                        to={`/admin/contact/reply/${item.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Trả lời
                      </Link>
                      <button
                        className="font-medium text-red-600 hover:underline"
                        onClick={() => handleDelete(item.id)}
                      >
                        Xoá
                      </button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })
          ) : (
            <Table.Row>
              <Table.Cell colSpan={6} className="text-center">
                Không có dữ liệu
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </section>
  );
}

export default AllContact;
