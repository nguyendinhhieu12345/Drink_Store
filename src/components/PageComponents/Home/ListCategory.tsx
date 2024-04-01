import assets from "@/assets";
import { configRouter } from "@/configs/router";
import { BaseResponseApi } from "@/type";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as homeApi from "@/api/PageApi/homeApi"

interface IListCategory extends BaseResponseApi {
    data: {
        id: string;
        name: string;
        imageUrl: string;
    }[]
}

const ListCategory = () => {
    const [categorys, setCategorys] = useState<IListCategory>()

    useEffect(() => {
        const getAllCategory = async () => {
            const data = await homeApi.getCategoryHome()
            if (data?.success) {
                setCategorys(data)
            }
        }
        getAllCategory()
    }, [])

    const nav = useNavigate()

    const handleRedirectAllCategory = () => {
        nav(configRouter.searchProduct)
    }

    return (
        <div className="flex flex-col items-start justify-center my-10 py-6 w-full h-auto bg-white rounded-lg">
            <div className="mb-2 font-semibold text-start px-3 text-2xl">
                Category
            </div>
            <div className="flex overflow-auto items-center justify-betweenx px-3 w-full">
                {categorys?.success && categorys?.data?.length > 0 && categorys?.data?.slice(0, 5)?.map((category, index) => (
                    <button
                        key={index}
                        className="flex flex-col items-center justify-center max-h-40 w-1/6 my-2 mx-3 py-2 border hover:border-gray-300 cursor-pointer rounded-md"
                    >
                        <div className="h-20 w-20 rounded-full p-0.5">
                            <img
                                className="h-full w-full rounded-full border-2 border-white object-cover hover:ease-in-out hover:duration-300 hover:delay-100 hover:scale-[1.2]"
                                src={category?.imageUrl}
                                loading="lazy"
                                alt="avatar"
                            />
                        </div>
                        <p className="mt-1 break-words text-center text-sm text-slate-600 line-clamp-1">
                            {category?.name}
                        </p>
                    </button>
                ))}
                {categorys?.success && categorys?.data?.length > 5 && <button
                    onClick={handleRedirectAllCategory}
                    className="flex flex-col items-center justify-center max-h-40 w-1/6 my-2 mx-3 py-2 border hover:border-gray-300 cursor-pointer rounded-md"
                >
                    <div className="h-20 w-20 rounded-full p-0.5">
                        <img
                            className="h-full w-full rounded-full border-2 border-white object-cover hover:ease-in-out hover:duration-300 hover:delay-100 hover:scale-[1.2]"
                            src={assets.images.imageLogin}
                            alt="avatar"
                            loading="lazy"
                        />
                    </div>
                    <p className="mt-1 w-14 break-words text-center text-sm text-slate-600 line-clamp-1">
                        See All
                    </p>
                </button>
                }
            </div>
        </div>
    );
};

export default ListCategory;
