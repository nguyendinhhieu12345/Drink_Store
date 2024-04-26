import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
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
            <Swiper
                className="px-4 flex flex-row items-center justify-center my-2 w-full"
                spaceBetween={50}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                slidesPerView={5}
            >
                {categorys?.success && categorys?.data?.length > 0 && categorys?.data?.map((category, index) => (
                    <SwiperSlide className="!w-36 border cursor-pointer rounded-md" key={index}>
                        <button
                            key={index}
                            onClick={() => handleGetProductByCategory(category?.id)}
                            className="flex flex-col items-center justify-center w-full"
                        >
                            <div className="h-20 w-20 mt-2 rounded-full p-0.5">
                                <img
                                    className="h-full w-full rounded-full border-2 border-white object-cover shadow-base"
                                    src={category?.imageUrl}
                                    alt="avatar"
                                />
                            </div>
                            <p className="my-2 w-14 break-all text-center text-base text-slate-600 line-clamp-1">
                                {category?.name}
                            </p>
                        </button>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default DisplayCategory
