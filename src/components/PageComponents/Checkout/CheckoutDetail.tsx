import { Cart } from "@/features/cart/cartSlice"
import AddAddress from "./AddAddress"
import AddPayment from "./AddPayment"
import OrderSumary from "./OrderSumary"
import { useEffect, useState } from "react"
import AddCoupon from "./AddCoupon"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { toast } from "react-toastify"
import { configRouter } from "@/configs/router"
import { useNavigate } from "react-router-dom"

export interface ICheckout {
    userId: string,
    itemList: Cart[],
    note: string,
    paymentType: string,
    addressId: string,
    shippingFee: number,
    productCouponCode?: string,
    orderCouponCode?: string,
    shippingCouponCode?: string,
    total: number,
    coin: number,
    type?: string,
    receiveTime?: string,
    branchId?: string,
    phoneNumber?: string,
    recipientName?: string
}

export interface IPropsCheckout {
    dataCheckout: ICheckout | undefined,
    setDataCheckout: React.Dispatch<React.SetStateAction<ICheckout | undefined>>,
    isDisable?: boolean,
    setIsDisable?: React.Dispatch<React.SetStateAction<boolean>>
}

function CheckoutDetail() {
    const [dataCheckout, setDataCheckout] = useState<ICheckout>()
    const [isDisable, setIsDisable] = useState<boolean>(false)
    const cartCurrent = useSelector<RootState, Cart[]>(
        (state) => state?.cartSlice?.cartCurrent as Cart[]
    )
    const nav = useNavigate()

    useEffect(() => {
        if (cartCurrent?.length > 0) {
            setDataCheckout((prev: ICheckout | undefined) => (
                {
                    ...prev!,
                    type: "Home Delivery",
                    itemList: cartCurrent.map(item => {
                        const { productId, itemDetailList } = item;
                        return {
                            productId,
                            itemDetailList: itemDetailList.map(detail => {
                                const { quantity, toppingNameList, size, note } = detail;
                                if (size) {
                                    return {
                                        quantity,
                                        toppingNameList,
                                        size,
                                        note
                                    };
                                }
                                else {
                                    return {
                                        quantity,
                                        note
                                    };
                                }
                            })
                        }
                    }) as Cart[],
                    total: cartCurrent.reduce((total, item) => {
                        return total + (item?.itemDetailList ?? []).reduce((subtotal, item) => {
                            return subtotal + (item?.price ?? 0);
                        }, 0);
                    }, 0) + (prev?.shippingFee as number ?? 0),
                }
            ))
        }
        else {
            nav(configRouter.home)
            toast.warning("Please add the product before checkout!")
            setDataCheckout((prev: ICheckout | undefined) => (
                {
                    ...prev!,
                    type: "Home Delivery",
                }
            ))
        }
    }, [])

    return (
        <div className="flex flex-col sm:flex-row items-start">
            <div className="flex flex-col w-full sm:w-1/2">
                <AddAddress dataCheckout={dataCheckout} setDataCheckout={setDataCheckout} isDisable={isDisable} setIsDisable={setIsDisable} />
                <AddPayment dataCheckout={dataCheckout} setDataCheckout={setDataCheckout} isDisable={isDisable} setIsDisable={setIsDisable} />
                <AddCoupon dataCheckout={dataCheckout} setDataCheckout={setDataCheckout} isDisable={isDisable} setIsDisable={setIsDisable} />
            </div>
            <OrderSumary dataCheckout={dataCheckout} setDataCheckout={setDataCheckout} isDisable={isDisable} setIsDisable={setIsDisable} />
        </div>
    )
}

export default CheckoutDetail