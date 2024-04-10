import { BaseResponseApi } from "@/type"
import CouponDetail from "./CouponDetail"
import * as couponApi from "@/api/PageApi/couponApi"
import { useEffect, useState } from "react";

export interface ICoupon {
    id: string;
    description: string;
    startDate: string;
    expirationDate: string;
    type: string
}

interface ICouponResponse extends BaseResponseApi {
    data: ICoupon[]
}

interface ICouponComponent {
    title: string;
}

function CouponComponent(props: ICouponComponent) {
    const [coupons, setCoupons] = useState<ICouponResponse>()

    const getCouponOrder = async (type: string, quantity: number) => {
        const data = await couponApi.getCouponsRelease(type, quantity)
        if (data?.success) {
            setCoupons(data)
        }
    }

    useEffect(() => {
        getCouponOrder(props.title.toUpperCase(), 3)
    }, [props.title])

    return (
        <div className="mt-10 p-5 rounded-xl shadow-base">
            <div className="w-full flex items-center justify-between px-3">
                <h5 className="text-lg font-bold uppercase">{props.title} Coupons</h5>
                <button className="italic px-4 py-2 rounded-xl hover:bg-btnActive hover:text-white" onClick={() => getCouponOrder(props.title.toUpperCase(), 10)}>See all</button>
            </div>
            <div className="flex flex-wrap w-full items-center">
                {coupons?.success && coupons?.data?.map((coupon) => (
                    <CouponDetail key={coupon?.id} coupon={coupon} />
                ))}
            </div>
        </div>
    )
}

export default CouponComponent