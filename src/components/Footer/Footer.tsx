import React from "react";
import { useTranslation } from "react-i18next";

const Footer = (): React.ReactElement => {
    const { t } = useTranslation()

    return (
        <footer className="bg-gray-800 text-white py-8 ">
            <div className="container mx-auto flex flex-col lg:flex-row justify-around">
                <div className="lg:flex-row space-y-4 lg:space-y-0 lg:space-x-16 hidden lg:flex">
                    <div className="text-center">
                        <h4 className="font-bold text-lg">{t("Introduction")}</h4>
                        <ul>
                            <li>{t("About Us")}</li>
                            <li>{t("Products")}</li>
                            <li>{t("Coupons")}</li>
                            <li>{t("Stores")}</li>
                        </ul>
                    </div>
                    <div className="text-center">
                        <h4 className="font-bold text-lg">{t("Terms")}</h4>
                        <ul>
                            <li>{t("Terms of use")}</li>
                            <li>{t("Information security policy")}</li>
                            <li>{t("Instructions for issuing VAT invoices")}</li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col items-center mt-8 lg:mt-0">
                    <div className="text-center">
                        <h4 className="font-bold text-lg">{t("Members")}</h4>
                        <ul>
                            <li>Nguyễn Văn An - 20110434 </li>
                            <li>Nguyễn Minh Đức - 2011461 </li>
                            <li>Nguyễn Đình Hiếu - 20142498 </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center text-gray-400 hidden lg:block">
                <p>{t("Ho Chi Minh City University of Technology and Education")}</p>
                <p>{t("Address: Thủ Đức, Ho Chi Minh City, Vietnam")}. Phone: (+84 - 028) 38968641  Email: ptchc@hcmute.edu.vn</p>
                <p>&copy; 2024</p>
            </div>
        </footer>
    );
};
export default Footer;
