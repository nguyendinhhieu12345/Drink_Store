import { useEffect, useState } from "react"
import { ICouponResponse } from "../../Coupon/CouponComponent"
import CouponDetail from "../../Coupon/CouponDetail"
import * as couponApi from "@/api/PageApi/couponApi"
import { useTranslation } from "react-i18next"

function ListDiscountOfDay() {
    const [coupons, setCoupons] = useState<ICouponResponse>()
    const { t } = useTranslation()

    const getCouponOrder = async (type: string, quantity: number) => {
        const data = await couponApi.getCouponsRelease(type, quantity)
        if (data?.success) {
            setCoupons(data)
        }
    }

    useEffect(() => {
        getCouponOrder("", 3)
    }, [])

    return (
        <div className="hidden sm:block sm:mb-5 w-full">
            <h2 className="text-3xl font-bold mb-4 border-l-4 border-red-500 pl-5 my-5">{t("Deal of The Day")}</h2>
            <div className="flex flex-wrap w-full items-center my-8">
                {coupons?.data?.map((coupon) => (
                    <CouponDetail key={coupon?.id} coupon={coupon} />
                ))}
            </div>
        </div>
    )
}

export default ListDiscountOfDay