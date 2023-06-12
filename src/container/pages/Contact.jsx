import { Button, Select, TextInput, Textarea } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";
import { createContact } from "../../api/contactService";

function Contact() {
  const initalState = {
    email: "",
    name: "",
    phone: "",
    gender: "m",
    comment: "",
  };
  const [contactData, setContactData] = useState(initalState);
  const [isSubmited, setIsSubmited] = useState(false);
  useEffect(() => {
    document.title = "Liên hệ với chúng tôi";
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    createContact(contactData).then(() => {
      setContactData(initalState);
      setIsSubmited(true);
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData({
      ...contactData,
      [name]: value,
    });
  };

  return (
    <section className="bg-[url(/images/contact/bg.jpg)] bg-cover bg-center bg-fixed min-h-[600px] flex justify-center items-center lg:px-0 lg:pt-0 pt-16 px-2">
      {isSubmited ? (
        <div className="p-7 rounded-lg backdrop-blur bg-[rgb(255,255,255,0.7)]">
          <h1 className="text-3xl font-bold tracking-tight mb-3">
            Cảm ơn bạn đã gửi câu trả lời
          </h1>
          <p className="text-gray-500 mb-3">
            Câu trả lời của bạn đã được ghi lại, chúng tôi sẽ email cho bạn
            trong thời gian sớm nhất
          </p>
          <p className="text-gray-500">
            Cần thêm thông tin? liên hệ email{" "}
            <a className="text-rose-600" href="mailto:cuong2th2@gmail.com">
              cuong2th2@gmail.com
            </a>
          </p>
        </div>
      ) : (
        <form
          method="post"
          onSubmit={handleSubmit}
          className="p-7 rounded-lg backdrop-blur bg-[rgb(255,255,255,0.7)] w-[512px] shadow-lg"
        >
          <h1 className="text-3xl font-bold tracking-tight mb-3">
            Liên hệ với chúng tôi
          </h1>
          <div className="flex flex-col gap-4 w-full">
            <TextInput
              required
              type="email"
              placeholder="Email"
              name="email"
              value={contactData.email}
              onChange={handleChange}
            />
            <TextInput
              required
              type="text"
              placeholder="Họ và tên"
              name="name"
              value={contactData.name}
              onChange={handleChange}
            />
            <TextInput
              required
              type="tel"
              placeholder="Số điện thoại"
              name="phone"
              value={contactData.phone}
              onChange={handleChange}
            />
            <Select
              required
              name="gender"
              value={contactData.gender}
              onChange={handleChange}
            >
              <option value="m">Nam</option>
              <option value="f">Nữ</option>
            </Select>
            <Textarea
              placeholder="Ý kiến của bạn..."
              required
              rows={5}
              name="comment"
              value={contactData.comment}
              onChange={handleChange}
            />
            <Button type="submit" color={"dark"}>
              Gửi
            </Button>
          </div>
        </form>
      )}
    </section>
  );
}

export default Contact;
