import CouponOrder from "@/components/PageComponents/Coupon/CouponComponent";
import TotalCoin from "@/components/PageComponents/Coupon/TotalCoin";
import BannerHome from "@/components/PageComponents/Home/BannerHome";
import SealPercentSVG from "@/components/SVG/SealPercentSVG"

function Coupon() {
    return (
        <div className="h-auto mt-25 mx-20">
            <div className="flex items-center justify-center my-5">
                <div className="mr-2 p-1 rounded-full bg-yellow-300 text-white"><SealPercentSVG /></div>
                <h1 className="font-medium">Shopfee Coupon</h1>
            </div>
            <BannerHome />
            <TotalCoin />
            <CouponOrder />
        </div>
    )
}

export default Coupon