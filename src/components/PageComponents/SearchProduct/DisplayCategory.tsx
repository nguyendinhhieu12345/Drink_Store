import { useEffect, useState } from "react";
import * as searchApi from "@/api/PageApi/searchApi"
import { BaseResponseApi } from "@/type";
import { ISearchProduct } from "@/pages/CustomerPage/SearchProduct";

interface IListCategory extends BaseResponseApi {
    data: {
        id: string;
        name: string;
        imageUrl: string;
    }[]
}

interface IDisplayCategory {
    setProducts: React.Dispatch<React.SetStateAction<ISearchProduct | undefined>>
}

function DisplayCategory(props: IDisplayCategory) {
    const [categorys, setCategorys] = useState<IListCategory>()

    const getAllCategory = async () => {
        const data = await searchApi?.getCategory()
        if (data?.success) {
            setCategorys(data)
        }
    }

    useEffect(() => {
        if (localStorage?.getItem("categorySearch") && localStorage?.getItem("categorySearch") !== "") {
            handleGetProductByCategory(localStorage?.getItem("categorySearch") as string);
        }
        getAllCategory()
    }, [])

    const handleGetProductByCategory = async (categoryId: string) => {
        const data = await searchApi?.getProductByCategoryId(categoryId, 1, 0, 0, 0, "")
        if (data?.success) {
            props?.setProducts(data)
            localStorage.setItem("categorySearch", categoryId)
        }
    }

    return (
        <div className="mb-5">
            <div className="mb-2 font-semibold text-start text-lg">
                Category
            </div>
            <div className="flex overflow-auto items-center w-full">
                {categorys?.success && categorys?.data?.length > 0 && categorys?.data?.slice(0, 5)?.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => handleGetProductByCategory(category?.id)}
                        className={`${index === 0 && "ml-0"} w-full lg:w-1/6 flex flex-col items-center justify-center max-h-40 my-2 mx-3 px-5 lg:px-0 py-2 border sm:hover:border-red-600 cursor-pointer rounded-md ${category?.id === localStorage?.getItem("categorySearch") && " border rounded-lg border-red-400 text-red-500"}`}
                    >
                        <div className="w-15 h-15 sm:h-20 sm:w-20 rounded-full p-0.5">
                            <img
                                className="shadow-base h-full w-full rounded-full border-2 border-white object-cover hover:ease-in-out hover:duration-300 hover:delay-100 hover:scale-[1.2]"
                                src={category?.imageUrl}
                                loading="lazy"
                                alt="avatar"
                            />
                        </div>
                        <p className="mt-4 break-all text-center text-base text-slate-600 line-clamp-1">
                            {category?.name}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default DisplayCategory
