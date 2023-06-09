import { Button, Label, Spinner, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";
import { useEffect } from "react";
import { findOneContact, updateContact } from "../../api/contactService";
import { useNavigate, useParams } from "react-router-dom";

function ReplyContact() {
  const { id } = useParams();
  const [contact, setContact] = useState({
    email: "",
    phone: "",
    name: "",
    comment: "",
    gender: "",
    replyContent: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navi = useNavigate();
  useEffect(() => {
    document.title = "Trả lời liên hệ";
    findOneContact(id).then((res) => {
      setContact(res.data);
    });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (contact.replyContent === "") return;
    setIsLoading(true);
    updateContact(id, contact)
      .then(() => {
        navi("/admin/contact");
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  return (
    <section>
      <h1 className="text-2xl uppercase font-semibold tracking-tight mb-3">
        Trả lời liên hệ
      </h1>
      <div className="grid grid-cols-2 gap-3">
        {contact && (
          <>
            <div>
              <h3 className="text-xl tracking-tight font-bold mb-3">
                Thông tin khách hàng
              </h3>
              <TextInput
                className="mb-3"
                type="text"
                defaultValue={contact.email}
                readOnly
              />
              <div className="mb-1">
                <Label value="Họ và tên" />
              </div>
              <TextInput
                className="mb-3"
                type="text"
                defaultValue={contact.name}
                readOnly
              />
              <div className="mb-1">
                <Label value="Điện thoại" />
              </div>
              <TextInput
                className="mb-3"
                type="text"
                defaultValue={contact.phone}
                readOnly
              />
              <div className="mb-1">
                <Label value="Nội dung" />
              </div>
              <Textarea
                className="mb-3"
                defaultValue={contact.comment}
                rows={7}
                readOnly
              />
            </div>
            <form onSubmit={handleSubmit}>
              <h3 className="text-xl tracking-tight font-bold mb-3">
                Câu trả lời
              </h3>
              <Textarea
                required
                rows={10}
                placeholder="Nhập câu trả lời tại đây"
                className="mb-2"
                value={contact.replyContent}
                onChange={(e) =>
                  setContact({ ...contact, replyContent: e.target.value })
                }
              />
              {isLoading ? (
                <Button className="px-5 ml-auto" color={"dark"} disabled>
                  <Spinner size={"sm"} />
                  <span className="ml-2">Đang xử lý...</span>
                </Button>
              ) : (
                <Button type="submit" color={"dark"} className="px-5 ml-auto">
                  Gửi
                </Button>
              )}
            </form>
          </>
        )}
      </div>
    </section>
  );
}

export default ReplyContact;
