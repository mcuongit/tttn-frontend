import React from "react";
import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();
  return (
    <section className="py-10">
      <section className="max-w-screen-xl mx-auto my-3 ">
        <h1 className="text-3xl font-semibold mb-3">
          {t("homepage.about.title")}
        </h1>
        <div className="grid grid-cols-2">
          <div>
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.7517639770494!2d106.77279011471894!3d10.830299292285023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752701a34a5d5f%3A0x30056b2fdf668565!2zVHLGsOG7nW5nIENhbyDEkOG6s25nIEPDtG5nIFRoxrDGoW5nIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1678787281459!5m2!1svi!2s"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe> */}
          </div>
          <div>
            <h3 className="font-bold text-2xl mb-2">
              Trường Cao đẳng Công thương Thành phố Hồ Chí Minh (HITC)
            </h3>
            Tiền thân là{" "}
            <i>
              Trường Kỹ thuật nghiệp vụ Công nghiệp nhẹ trực thuộc Bộ Công
              nghiệp nhẹ
            </i>
            . Hơn 43 năm xây dựng và phát triển, hiện HITC sở hữu 2 cơ sở học
            tập, nghiên cứu và làm việc được đầu tư xây dựng khang trang, hiện
            đại cùng 1 khu Ký túc xá với sức chứa hơn 2.000 sinh viên nội trú.
            <p className="mt-1">
              Cơ sở 1: Số 20, đường Tăng Nhơn Phú, phường Phước Long B, Tp. Thủ
              Đức Quận 9 cũ, TP.HCM.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}

export default About;
