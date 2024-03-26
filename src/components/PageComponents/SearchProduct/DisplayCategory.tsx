import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";

function DisplayCategory() {
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
        {Array.from({ length: 10 }, (_, index) => (
          <SwiperSlide className="!w-25 border cursor-pointer" key={index}>
            <div className="flex flex-col items-center justify-center w-full">
              <div className="h-20 w-20 rounded-full p-0.5">
                <img
                  className="h-full w-full rounded-full border-2 border-white object-cover"
                  src="https://minio.thecoffeehouse.com/image/admin/1705920417_tra-sua-suong-sao_400x400.jpg"
                  alt="avatar"
                />
              </div>
              <p className="my-2 w-14 break-words text-center text-sm text-slate-600 line-clamp-1">
                Coffe
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default DisplayCategory
