import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDebounce } from "../../hooks/useDebounce ";
import * as searchProduct from "@/api/PageApi/searchApi"
import { useNavigate } from "react-router-dom";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import SearchHeaderResult from "./SearchHeaderResult";
import { BaseResponseApi } from "@/type";
import { useTranslation } from "react-i18next";

interface Inputs {
    dataInput: string;
}
interface iSearchHeader extends BaseResponseApi {
    data: {
        autocompleteTextList: [],
        highlightTextList: string[]
    }
}
const SearchHeader = (): React.ReactElement => {
    const [dataSearch, setDataSearch] = React.useState<iSearchHeader>();
    const [isFocus, setIsFocus] = React.useState<boolean>(false);
    const refDiv = React.useRef<HTMLDivElement>(null);
    useOnClickOutside(refDiv, () => {
        setIsFocus(false);
    });
    const {
        register,
        handleSubmit,
        watch,
    } = useForm<Inputs>();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const debouncedValue = useDebounce<string>(watch("dataInput"), 500);

    React.useEffect(() => {
        if (debouncedValue !== undefined) {
            const callApi = async () => {
                try {
                    const data = await searchProduct.getProductByAutoComplete(debouncedValue.trim());
                    if (data?.success) {
                        setDataSearch(data);
                    }
                } catch (error) {
                    Promise.reject(error);
                }
            };
            callApi();
        }
    }, [debouncedValue]);
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (!data) return;
        navigate(`/search?key=${encodeURIComponent(data.dataInput.trim())}`);
        setIsFocus(false);
    };

    return (
        <div className="relative" ref={refDiv}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label
                    htmlFor="search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white w-96"
                >
                    Search
                </label>
                <div className="relative w-56 sm:w-96">
                    <div
                        className="absolute inset-y-0 left-0 flex items-center pl-3  cursor-pointer z-999999"
                        onClick={handleSubmit(onSubmit)}
                    >
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        {...register("dataInput")}
                        onFocus={() => setIsFocus(true)}
                        type="text"
                        className="block w-full  pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={t("Enter a search keyword")}
                    />
                </div>
            </form>
            <SearchHeaderResult
                dataSearch={dataSearch?.data?.highlightTextList as string[]}
                setIsFocus={setIsFocus}
                isOpen={isFocus}
            />
        </div>
    );
};

export default SearchHeader;
