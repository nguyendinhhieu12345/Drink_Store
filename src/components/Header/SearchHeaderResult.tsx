import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
interface IProps {
    isOpen: boolean;
    dataSearch: string[];
    setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
}
const SearchHeaderResult = (props: IProps): React.ReactElement => {
    const { t } = useTranslation();

    return (
        <>
            {props.isOpen && (
                <div className="absolute top-[110%] bg-white rounded-md h-auto w-full px-2 z-99999 shadow-xl overflow-hidden border">
                    <div className="h-full w-full py-4 overflow-auto">
                        <div className="w-full h-full space-y-2 ">
                            <div>
                                <h5 className="text-base font-bold">{t("Suggested Products")}</h5>
                            </div>
                            {props.dataSearch?.length === 0 && (
                                <div className="w-full h-[50px] rounded-sm flex items-center justify-center px-4 py-2 text-gray-500 space-x-3">
                                    <p className="text-sm font-norma overflow-hidden text-ellipsis">
                                        {t("No result")}
                                    </p>
                                </div>
                            )}
                            {props.dataSearch?.map((data, index) => {
                                return (
                                    <Link
                                        key={index}
                                        to={`/search?key=${encodeURIComponent(data.trim().replace(/<\/?em>/g, ''))}`}
                                        onClick={() => props.setIsFocus(false)}
                                    >
                                        <h5 className="text-base font-bold overflow-hidden text-ellipsis w-full hover:bg-gray-200 py-2 px-2 rounded-lg" >
                                            <p dangerouslySetInnerHTML={{ __html: data.replace(/<em>/g, "<em class='text-brown-600'>") }} className="w-full"></p>
                                        </h5>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SearchHeaderResult;
