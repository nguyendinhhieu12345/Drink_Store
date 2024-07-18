import { BaseResponseApi } from "@/type"
import CouponDetail from "./CouponDetail"
import * as couponApi from "@/api/PageApi/couponApi"
import { useEffect, useState } from "react";
import CouponType from "./CouponType";
import { useTranslation } from "react-i18next";

export interface ICoupon {
    id: string;
    description: string;
    startDate: string;
    expirationDate: string;
    type: string
}

export interface ICouponResponse extends BaseResponseApi {
    data: ICoupon[]
}


function CouponComponent() {
    const [coupons, setCoupons] = useState<ICouponResponse>()
    const [activeBtn, setActiveBtn] = useState<boolean>(false)
    const { t } = useTranslation()

    const getCouponOrder = async (type: string, quantity: number) => {
        const data = await couponApi.getCouponsRelease(type, quantity)
        if (data?.success) {
            setCoupons(data)
        }
    }

    useEffect(() => {
        getCouponOrder("", 6)
    }, [])

    return (
        <div className="mt-10 p-5 rounded-xl shadow-base">
            <div className="w-full flex items-center justify-between px-3">
                <h2 className="text-3xl font-bold mb-4 border-l-4 border-red-500 pl-5 my-5">{t("Lastest Coupons")}</h2>
                <button className="italic px-4 py-2 rounded-xl hover:bg-btnActive hover:text-white" onClick={() => setActiveBtn(prev => !prev)}>{t("See all")}</button>
            </div>
            <div className="flex flex-wrap w-full items-center">
                {coupons?.success && coupons?.data?.map((coupon) => (
                    <CouponDetail key={coupon?.id} coupon={coupon} />
                ))}
            </div>
            {activeBtn && <CouponType />}
        </div>
    )
}

export default CouponComponent