import { ISearchProduct } from "@/pages/CustomerPage/SearchProduct";
import { IOrdersResponse } from "@/pages/CustomerPage/UserPage/MyOrderOfUser";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Dispatch, SetStateAction } from "react";
import { IReview } from "../ProductDetail/Reviews";

interface ITablePaging {
    data: ISearchProduct | IOrdersResponse | IReview;
    pageActive: number;
    setPageActive: Dispatch<SetStateAction<number>>;
}

function TablePaging(props: ITablePaging) {
    return (
        <div className="px-4 py-3 border-t border-gray-200  bg-white text-gray-500 ">
            <div className="flex flex-col justify-end text-xs sm:flex-row text-gray-600 ">
                <div className="flex mt-2 sm:mt-auto sm:justify-end">
                    <nav aria-label="Product Page Navigation">
                        <ul className="inline-flex items-center">
                            {props?.data?.data?.totalPage >= 2 && (
                                <li>
                                    <button
                                        className="inline-flex items-center justify-center leading-5 transition-colors duration-150 font-medium p-2 rounded-md text-gray-600 focus:outline-none border border-transparent hover:bg-gray-100"
                                        type="button"
                                        aria-label="Previous"
                                        onClick={() => {
                                            if ((props?.pageActive as number) >= 2) {
                                                props?.setPageActive &&
                                                    props?.setPageActive((prev) => prev - 1);
                                            }
                                        }}
                                    >
                                        <CaretLeft size={12} />
                                    </button>
                                </li>
                            )}

                            {props?.data?.data?.totalPage >= 2 &&
                                Array.from({ length: props?.data?.data?.totalPage }).map(
                                    (_, i) => (
                                        <li
                                            key={i}
                                            className={`${i + 1 === props?.pageActive
                                                ? "bg-green-500 rounded-md"
                                                : "hover:bg-gray-100 rounded-md"
                                                }`}
                                        >
                                            <button
                                                className={`${i + 1 === props?.pageActive
                                                    ? "bg-green-500 hover:bg-green-500"
                                                    : ""
                                                    }inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 border border-transparent `}
                                                type="button"
                                                onClick={() =>
                                                    props?.setPageActive && props?.setPageActive(i + 1)
                                                }
                                            >
                                                {i + 1}
                                            </button>
                                        </li>
                                    )
                                )}
                            {props?.data?.data?.totalPage >= 2 && (
                                <li>
                                    <button
                                        className="inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium p-2 rounded-md text-gray-600 focus:outline-none border border-transparent hover:bg-gray-100"
                                        type="button"
                                        aria-label="Next"
                                        onClick={() => {
                                            if (
                                                (props?.pageActive as number) <
                                                props?.data?.data?.totalPage
                                            ) {
                                                props?.setPageActive &&
                                                    props?.setPageActive((prev) => prev + 1);
                                            }
                                        }}
                                    >
                                        <CaretRight size={12} />
                                    </button>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default TablePaging;
