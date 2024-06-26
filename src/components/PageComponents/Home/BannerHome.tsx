import { BaseResponseApi } from "@/type";
import { Carousel } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import * as homeApi from "@/api/PageApi/homeApi"

interface IBannerHome extends BaseResponseApi {
    data: {
        imageUrl: string;
    }[]
}

function BannerHome() {
    const [banners, setBanners] = useState<IBannerHome>()

    useEffect(() => {
        const getAllBanner = async () => {
            const data = await homeApi.getBannerHome()
            if (data?.success) {
                setBanners(data)
            }
        }
        getAllBanner()
    }, [])

    return (
        <div className="w-full pt-5 h-auto mb-10">
            <Carousel
                placeholder=""
                className="rounded-xl max-h-[650px] w-full"
            >
                {banners?.success && banners?.data?.length > 0 && banners?.data?.map((banner, index) => (
                    <img
                        key={index}
                        src={banner?.imageUrl}
                        alt="image 1"
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                ))}
            </Carousel>
        </div>
    );
}

export default BannerHome;
