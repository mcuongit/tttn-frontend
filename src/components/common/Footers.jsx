import { Footer } from "flowbite-react";
import React from "react";
import {
    BsFacebook,
    BsGithub,
    BsInstagram,
    BsTwitter,
} from "../../utils/HeroIcon";

function Footers() {
    return (
        <div className="max-w-screen-2xl mx-auto">
            <Footer container={true} bgDark={true}>
                <div className="w-full">
                    <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                        <div className="flex gap-x-3">
                            <YinYangIcon />
                            <span className="whitespace-nowrap text-2xl font-semibold text-gray-800">
                                BookingCare
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                            <div>
                                <Footer.Title title="about" />
                                <Footer.LinkGroup col={true}>
                                    <Footer.Link href="#">Flowbite</Footer.Link>
                                    <Footer.Link href="#">
                                        Tailwind CSS
                                    </Footer.Link>
                                </Footer.LinkGroup>
                            </div>
                            <div>
                                <Footer.Title title="Follow us" />
                                <Footer.LinkGroup col={true}>
                                    <Footer.Link href="#">Github</Footer.Link>
                                    <Footer.Link href="#">Discord</Footer.Link>
                                </Footer.LinkGroup>
                            </div>
                            <div>
                                <Footer.Title title="Legal" />
                                <Footer.LinkGroup col={true}>
                                    <Footer.Link href="#">
                                        Privacy Policy
                                    </Footer.Link>
                                    <Footer.Link href="#">
                                        Terms & Conditions
                                    </Footer.Link>
                                </Footer.LinkGroup>
                            </div>
                        </div>
                    </div>
                    <Footer.Divider />
                    <div className="w-full sm:flex sm:items-center sm:justify-between">
                        <Footer.Copyright href="#" by="Flowbite™" year={2022} />
                        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                            <Footer.Icon href="#" icon={BsFacebook} />
                            <Footer.Icon href="#" icon={BsInstagram} />
                            <Footer.Icon href="#" icon={BsTwitter} />
                            <Footer.Icon href="#" icon={BsGithub} />
                        </div>
                    </div>
                </div>
            </Footer>
            <div className="py-3 bg-gray-300">
                <p className="text-center">&copy; 2023 - Nguyễn Mạnh Cường</p>
            </div>
        </div>
    );
}

const YinYangIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-40 -40 80 80"
            className="h-8 w-8"
        >
            <circle r="39" />
            <path
                fill="#fff"
                d="M0,38a38,38 0 0 1 0,-76a19,19 0 0 1 0,38a19,19 0 0 0 0,38"
            />
            <circle r="5" cy="19" fill="#fff" />
            <circle r="5" cy="-19" />
        </svg>
    );
};

export default Footers;
