import { Footer } from "flowbite-react";
import yinyang from "../../assets/yinyang.svg";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "../../utils/HeroIcon";

function Footers() {
  return (
    <>
      <hr />
      <div className="max-w-screen-lg mx-auto">
        <Footer container={true} bgDark={true} className="border-0 shadow-none">
          <div className="w-full">
            <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
              <div className="flex gap-x-3">
                <Footer.Brand
                  href="/"
                  src={yinyang}
                  alt="CuongStore"
                  name="gitech"
                />
              </div>
              <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                <div>
                  <Footer.Title title="về chúng tôi" />
                  <Footer.LinkGroup col={true}>
                    <Footer.Link href="#">Giới thiệu</Footer.Link>
                    <Footer.Link href="#">Thông tin website</Footer.Link>
                  </Footer.LinkGroup>
                </div>
                <div>
                  <Footer.Title title="theo dõi" />
                  <Footer.LinkGroup col={true}>
                    <Footer.Link
                      href="https://www.facebook.com/rua.cuongmn/"
                      target="_blank"
                    >
                      Facebook
                    </Footer.Link>
                    <Footer.Link href="/">Instagram</Footer.Link>
                  </Footer.LinkGroup>
                </div>
                <div>
                  <Footer.Title title="pháp lý" />
                  <Footer.LinkGroup col={true}>
                    <Footer.Link href="#">Privacy Policy</Footer.Link>
                    <Footer.Link href="#">Terms & Conditions</Footer.Link>
                  </Footer.LinkGroup>
                </div>
              </div>
            </div>
            <Footer.Divider />
            <div className="w-full sm:flex sm:items-center sm:justify-between">
              <Footer.Copyright
                href="https://www.facebook.com/rua.cuongmn/"
                by="Nguyễn Mạnh Cường"
                year={2023}
              />
              <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                <Footer.Icon
                  href="https://www.facebook.com/rua.cuongmn/"
                  target="_blank"
                  icon={BsFacebook}
                />
                <Footer.Icon href="#" icon={BsInstagram} />
                <Footer.Icon href="#" icon={BsTwitter} />
                <Footer.Icon
                  href="https://github.com/mcuongit"
                  target="_blank"
                  icon={BsGithub}
                />
              </div>
            </div>
          </div>
        </Footer>
      </div>
    </>
  );
}

export default Footers;
