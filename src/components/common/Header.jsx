import React from "react";
import logoApp from "../../assets/logo.svg";
import { MenuIcon, Question } from "../../utils/HeroIcon";
// import { LANGUAGES } from "../../utils/constant";
import { Select } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../features/languagesSlice";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../utils/constant";

function Header() {
  const lang = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const handleSelectChange = (e) => {
    const value = e.target.value;
    const action = changeLanguage(value);
    dispatch(action);
    i18n.changeLanguage(value);
  };

  return (
    <header className="bg-white">
      <div className="container max-w-screen-xl mx-auto text-base">
        <div className="flex flex-row items-center py-4 justify-start">
          <div className="basis-3/12 flex flex-row items-center gap-x-2">
            <MenuIcon />
            <img className="w-[200px] h-auto" srcSet={logoApp} alt="logo" />
          </div>
          <nav className="basis-7/12">
            <ul className="flex flex-row justify-between text-sm items-center">
              <li>
                <a href="#">
                  <div className="font-semibold">
                    {t("homepage.header.specialty")}
                  </div>
                  <small>{t("homepage.header.searchdoctor")}</small>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="font-semibold">
                    {t("homepage.header.health-facilities")}
                  </div>
                  <small>{t("homepage.header.select-room")}</small>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="font-semibold">
                    {t("homepage.header.doctor")}
                  </div>
                  <small>{t("homepage.header.choose-doctor")}</small>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="font-semibold">
                    {t("homepage.header.medical-package")}
                  </div>
                  <small>{t("homepage.header.general-health-check")}</small>
                </a>
              </li>
            </ul>
          </nav>
          <div className="basis-2/12 flex items-center justify-around">
            <a href="#" className="flex justify-center text-gray-400">
              <Question />
              <span className="font-bold">{t("homepage.header.support")}</span>
            </a>
            <div id="select">
              <Select
                id="lang"
                required={true}
                sizing="sm"
                defaultValue={lang.value}
                onChange={(e) => {
                  handleSelectChange(e);
                }}
              >
                <option value={LANGUAGES.VI}>Tiếng Việt</option>
                <option value={LANGUAGES.EN}>English</option>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
