import React from "react";

const Footer = (): React.ReactElement => {
    return (
        <footer className="bg-gray-800 text-white py-8 ">
            <div className="container mx-auto flex flex-col lg:flex-row justify-around">
                <div className="lg:flex-row space-y-4 lg:space-y-0 lg:space-x-16 hidden lg:flex">
                    <div className="text-center">
                        <h4 className="font-bold text-lg">Introduction</h4>
                        <ul>
                            <li>About Us</li>
                            <li>Products</li>
                            <li>Coupons</li>
                            <li>Stores</li>
                        </ul>
                    </div>
                    <div className="text-center">
                        <h4 className="font-bold text-lg">Terms</h4>
                        <ul>
                            <li>Terms of use</li>
                            <li>Information security policy</li>
                            <li>Instructions for issuing VAT invoices</li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col items-center mt-8 lg:mt-0">
                    <div className="text-center">
                        <h4 className="font-bold text-lg">Members</h4>
                        <ul>
                            <li>Nguyen Van An - 20110434 </li>
                            <li>Nguyen Minh Duc - 2011461 </li>
                            <li>Nguyen Dinh Hieu - 20142498 </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center text-gray-400 hidden lg:block">
                <p>Ho Chi Minh City University of Technology and Education</p>
                <p>Address: Thủ Đức, Ho Chi Minh City, Vietnam. Phone: (+84 - 028) 38968641  Email: ptchc@hcmute.edu.vn</p>
                <p>&copy; 2024</p>
            </div>
        </footer>
    );
};
export default Footer;
