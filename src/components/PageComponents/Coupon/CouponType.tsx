import { useEffect, useState } from "react"
import { ICouponResponse } from "./CouponComponent"
import CouponDetail from "./CouponDetail"
import * as couponApi from "@/api/PageApi/couponApi"

function CouponType() {
    const [coupons, setCoupons] = useState<ICouponResponse>()
    const [activeBtn, setActiveBtn] = useState<number>(0)

    const getCouponOrder = async (type: string, quantity: number) => {
        const data = await couponApi.getCouponsRelease(type, quantity)
        if (data?.success) {
            setCoupons(data)
        }
    }

    useEffect(() => {
        if (activeBtn === 0)
            getCouponOrder("PRODUCT", 30)
        else if (activeBtn === 1)
            getCouponOrder("SHIPPING", 30)
        else 
        getCouponOrder("ORDER", 30)
    }, [activeBtn])

    return (
        <div>
            <div className='flex items-center justify-between'>
                <h2 className="text-3xl font-bold mb-4 border-l-4 border-red-500 pl-5 my-5">All Coupons</h2>
                <div className='flex items-center'>
                    <button onClick={() => setActiveBtn(0)} className={`px-3 py-2 mx-3 ${activeBtn === 0 && 'text-red-500 border-b-4 border-red-500 font-semibold'} hover:text-red-500  transition ease-in-out delay-75`}>
                        Product
                    </button>
                    <button onClick={() => setActiveBtn(1)} className={`px-3 py-2 mx-3 ${activeBtn === 1 && 'text-red-500 border-b-4 border-red-500 font-semibold'} hover:text-red-500 transition ease-in-out delay-75`}>
                        Shipping
                    </button>
                    <button onClick={() => setActiveBtn(2)} className={`px-3 py-2 mx-3 ${activeBtn === 2 && 'text-red-500 border-b-4 border-red-500 font-semibold'} hover:text-red-500 transition ease-in-out delay-75`}>
                        Order
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap w-full items-center">
                {coupons?.success && coupons?.data?.map((coupon) => (
                    <CouponDetail key={coupon?.id} coupon={coupon} />
                ))}
            </div>
        </div>
    )
}

export default CouponType