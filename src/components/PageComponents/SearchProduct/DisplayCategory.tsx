import { useEffect, useState } from "react";
import * as searchApi from "@/api/PageApi/searchApi"
import { BaseResponseApi } from "@/type";
import { ISearchProduct } from "@/pages/CustomerPage/SearchProduct";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css"
import assets from "@/assets";

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
                <Swiper
                    spaceBetween={30}
                    navigation
                    scrollbar={{ draggable: true }}
                    // slidesPerView={6}
                    breakpoints={{
                        320: {
                            slidesPerView: 4,
                            spaceBetween: 10
                        },
                        640: {
                            slidesPerView: 6,
                            spaceBetween: 20
                        }
                    }}
                >
                    {categorys?.success && categorys?.data?.length > 0 && categorys?.data?.map((cate, index) => (
                        <SwiperSlide className="cursor-pointer" key={index} onClick={() => handleGetProductByCategory(cate?.id)}>
                            <div className={`flex flex-col items-center justify-center w-full ${cate?.id === localStorage?.getItem("categorySearch") && "font-semibold border rounded-lg border-brown-400 text-brown-500"}`}>
                                <div className="h-32 w-25 p-0.5">
                                    <img
                                        className="h-full w-full border-2 border-white object-contain"
                                        src={cate?.imageUrl}
                                        alt="avatar"
                                    />
                                </div>
                                <p className="my-2 text-center text-sm text-slate-600 line-clamp-1">
                                    {cate?.name}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                    <SwiperSlide className="cursor-pointer">
                        <div className={`flex flex-col items-center justify-center w-full`} onClick={async () => {
                            const data = await searchApi.getProductByKeyName(1, "", 0, 0, 0, "")
                            if (data?.success) {
                                props?.setProducts(data)
                            }
                            localStorage.removeItem("categorySearch")
                        }
                        }>
                            <div className="h-32 w-25 p-0.5">
                                <img
                                    className="h-full w-full border-2 border-white object-contain"
                                    src={assets.images.shopfeeIcon}
                                    alt="avatar"
                                />
                            </div>
                            <p className="my-2 text-center text-sm text-slate-600 line-clamp-1">
                                All
                            </p>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default DisplayCategory
