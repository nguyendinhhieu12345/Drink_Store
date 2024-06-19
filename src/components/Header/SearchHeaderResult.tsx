import React from "react";
import { Link } from "react-router-dom";
import ImageWithError from "../ImageError/ImageWithError";
import { IProduct } from "@/types/type";
import { formatVND } from "@/utils/hepler";
interface IProps {
    isOpen: boolean;
    dataSearch: {
        keyword: string[];
        products: IProduct[];
    };
    setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
}
const SearchHeaderResult = (props: IProps): React.ReactElement => {
    return (
        <>
            {props.isOpen && (
                <div className="absolute top-[110%] bg-white rounded-md h-auto w-full px-2 z-99999 shadow-xl overflow-hidden border">
                    <div className="h-full w-full py-4 overflow-auto">
                        <div className="w-full h-full space-y-2 ">
                            <div>
                                <h5 className="text-base font-bold">Suggested Products</h5>
                            </div>
                            {props.dataSearch.products?.length === 0 && (
                                <div className="w-full h-[50px] rounded-sm flex items-center justify-center px-4 py-2 text-gray-500 space-x-3">
                                    <p className="text-sm font-norma overflow-hidden text-ellipsis">
                                        No result
                                    </p>
                                </div>
                            )}
                            {props.dataSearch.products?.map((data) => {
                                return (
                                    <Link
                                        key={data.id}
                                        to={`/product/${data?.id}`}
                                        onClick={() => props.setIsFocus(false)}
                                    >
                                        <div className="rounded-md bg-white hover:bg-gray-200 min-h-[50px] flex items-center justify-start px-2 py-2 space-x-3">
                                            <div className=" h-[40px] w-[60px] rounded-md overflow-hidden">
                                                <ImageWithError
                                                    src={data?.thumbnailUrl ? data?.thumbnailUrl : ""}
                                                    alt=""
                                                    className=" w-full h-full"
                                                />
                                            </div>
                                            <div className=" flex flex-col justify-start items-start w-ful ">
                                                <h5 className="text-sm font-bold overflow-hidden text-ellipsis">
                                                    {data?.name}
                                                </h5>
                                                <p className="text-sm  font-normal text-gray-500 overflow-hidden text-ellipsis">
                                                    {formatVND(data?.price ? data?.price : 0)}
                                                </p>
                                            </div>
                                        </div>
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
