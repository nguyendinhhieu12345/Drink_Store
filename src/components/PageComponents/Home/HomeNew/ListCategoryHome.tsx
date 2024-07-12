import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import { configRouter } from "@/configs/router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as homeApi from "@/api/PageApi/homeApi"
import { IListCategory } from "../ListCategory";

function ListCategoryHome() {
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

    const handleSeeProductOfCategory = (categoryId: string) => {
        localStorage?.setItem("categorySearch", categoryId)
        nav(configRouter?.searchProduct)
    }

    return (
        <div className="mb-5 w-full">
            <h2 className="text-xl sm:text-3xl font-bold mb-4 border-l-4 border-red-500 pl-5 my-5">Categorys</h2>
            <div className='my-10'>
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
                    {categorys?.data?.map((cate, index) => (
                        <SwiperSlide className="cursor-pointer" key={index} onClick={() => handleSeeProductOfCategory(cate?.id)}>
                            <div className="flex flex-col items-center justify-center w-full">
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
                </Swiper>
            </div>
        </div>
    )
}

export default ListCategoryHome